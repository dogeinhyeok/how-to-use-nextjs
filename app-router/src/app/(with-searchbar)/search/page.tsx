import BookItem from "@/components/book-item";
import { BookData } from "@/types";

// export const dynamic = "force-dynamic";
/**
 * 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
 * 1. auto: 기본값
 * 2. force-static: 모든 페이지를 Static 페이지로 설정
 * 3. force-dynamic: 모든 페이지를 Dynamic 페이지로 설정
 * 4. error: 유효하지 않은 설정
 */

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
