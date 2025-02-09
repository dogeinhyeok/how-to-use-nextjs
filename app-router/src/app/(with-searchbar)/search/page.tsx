import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  // 현재 페이지 메타 데이터를 동적으로 생성하는 역할을 합니다.
  const { q } = await searchParams;

  return {
    title: `한입 북스 검색 | ${q}`,
    description: `${q}의 검색 결과입니다`,
    images: ["/thumbnail.png"],
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;
  return (
    <Suspense key={q} fallback={<BookListSkeleton count={10} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
