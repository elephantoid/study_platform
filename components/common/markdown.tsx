import * as React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/**
 * 카드·해설 본문 렌더러. 외부 MIT 원문(verbatim)을 그대로 그리는 경로라 안전 설정을 고정한다.
 * - raw HTML 은 렌더링하지 않는다. rehype-raw 를 쓰지 않으므로 HTML 노드는 버려진다 (rehype-raw 추가 금지).
 * - 링크·이미지 URL 은 https: 만 남긴다. 상대 경로·javascript:·data: 는 지운다.
 * - 수식은 KaTeX (trust: false 기본값 → \href 등 위험 명령 비활성).
 */
export function safeUrl(url: string): string {
  try {
    return new URL(url).protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

const components: Components = {
  a: ({ href, children }) =>
    href ? (
      <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 underline">
        {children}
      </a>
    ) : (
      <span>{children}</span>
    ),
  // 원격 이미지는 출처 확인 없이 불러오지 않는다. 대체 텍스트와 링크만 남긴다.
  img: ({ src, alt }) =>
    typeof src === "string" && src ? (
      <a href={src} target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 underline">
        [이미지: {alt || "원본 보기"}]
      </a>
    ) : null,
};

export function Markdown({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div data-testid="markdown" className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        urlTransform={safeUrl}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
