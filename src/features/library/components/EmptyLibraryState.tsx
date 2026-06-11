/**
 * 0권 케이스 전용 — 라이브러리에 아직 간직한 책이 한 권도 없을 때.
 *
 * 디자인:
 *   - 가운데에 plain-paper 한 장 같은 thin square placeholder.
 *   - 그 아래에 두 줄 카피 — 큰 따옴표 없이 담담하게.
 *   - 페이지 자체의 cream 그라디언트와 어울리도록 색은 보통의 stone/neutral.
 */
export function EmptyLibraryState() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col items-center gap-6 px-5 text-center">
      {/* 종이 한 장 같은 placeholder. */}
      <div
        aria-hidden
        className="h-16 w-16 rounded-md border-[1.5px] border-stone-400/70 bg-white/60 shadow-[0_2px_8px_-4px_rgb(0_0_0_/_0.08)] backdrop-blur-sm"
      />

      <div className="space-y-1.5">
        <p className="font-sans text-[16px] font-semibold tracking-tight text-stone-800">
          아직 간직한 책이 없어요
        </p>
        <p className="text-[13px] leading-relaxed text-stone-600">
          링크를 자랑하고
          <br />
          우리만의 서재를 열어볼까요?
        </p>
      </div>
    </div>
  );
}
