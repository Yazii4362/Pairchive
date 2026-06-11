/* Shared dummy data for the static prototype.
   Colors are sourced from the 7-Scale palette (tokens.css). */
window.PAIRCHIVE_DATA = {
  // Spine colors for shelf illustrations (drawn from Pear / Pink / Green / Blue ramps)
  spineColors: [
    '#0C5031', // green-900
    '#FF4FA3', // pink-400
    '#FFC800', // pear-400
    '#2568E8', // blue-400
    '#FF8A36', // orange-400
    '#B83870', // pink-600
    '#0A0A0A', // neutral-900
    '#A8A5A6', // neutral-400
    '#6FDC8C', // green-300
    '#5B95FF', // blue-300
  ],

  // The user's own bookshelf: one default personal book on first launch.
  defaultBook: {
    id: 'me-1',
    title: '나의 첫 책',
    subtitle: '개인 아카이브',
    accent:  '#2DB854',          // green-400
    kind:    'solo',
    count:   0,
    endsIn:  '계속 진행 중',
  },

  // After user has been playing for a while
  bookshelf: [
    { id: 'me-1',  title: '나의 첫 책',         subtitle: '개인 아카이브', accent: '#2DB854', kind: 'solo', count: 12, endsIn: 'D-21' },
    { id: 'me-2',  title: '두비와의 디자인 책',  subtitle: '두비 ♡ 페어',  accent: '#FF4FA3', kind: 'pair', count: 24, endsIn: 'D-7'  },
    { id: 'me-3',  title: '리아와의 영화 책',    subtitle: '리아 ♡ 페어',  accent: '#FFC800', kind: 'pair', count: 8,  endsIn: 'D-14' },
    { id: 'me-4',  title: '레퍼런스 저장소',     subtitle: '개인 아카이브', accent: '#5B95FF', kind: 'solo', count: 31, endsIn: '계속 진행 중' },
  ],

  // Archived (closed) books → live on the upper shelf
  archive: [
    { id: 'a-1', title: '4월 · 두비와의 음악 책',     accent: '#B83870' },
    { id: 'a-2', title: '3월 · 야지의 다이어트 책',   accent: '#2DB854' },
    { id: 'a-3', title: '2월 · 리아와의 여행 책',     accent: '#FFC800' },
  ],

  // Sample links inside a book
  links: [
    { title: 'Apple 디자인 어워드 2026 수상작',  host: 'developer.apple.com', tags: ['디자인'],   accent: '#0A0A0A', who: '두비' },
    { title: 'Figma Variables 완벽 가이드',     host: 'figma.com/blog',      tags: ['디자인'],   accent: '#FF4FA3', who: '나'   },
    { title: '도쿄 골목 사진 에세이',           host: 'medium.com',          tags: ['글'],       accent: '#FFC800', who: '두비' },
    { title: '선형 대수학의 직관적 이해',       host: 'youtube.com',         tags: ['영상','수학'], accent: '#2DB854', who: '나'   },
  ],

  // Default emoji reactions (Pairchive replaces comments with these)
  reactions: [
    { emoji: '🔥', label: '인상 깊어요', count: 3, pressed: true  },
    { emoji: '💡', label: '아이디어',    count: 2, pressed: false },
    { emoji: '🫶', label: '하트',        count: 1, pressed: false },
    { emoji: '😮', label: '와우',        count: 1, pressed: false },
    { emoji: '🔖', label: '북마크',      count: 0, pressed: false },
  ],

  peers: [
    { initial: '두', color: 'linear-gradient(135deg,#FF93D7,#70D2FF)' },
    { initial: '야', color: 'linear-gradient(135deg,#FFC1EA,#FF6EB4)' },
  ],

  // Incoming / outgoing invitations for the Pair tab
  invitations: {
    received: [
      { from: '리아',  bookTitle: '같이 보는 영화 책',  sentAt: '오늘 14:22' },
      { from: '하준',  bookTitle: '러닝 메이트 책',      sentAt: '어제'      },
    ],
    sent: [
      { to: '두비',    bookTitle: '디자인 트렌드 책',    state: '수락 대기'  },
      { to: '예지',    bookTitle: 'AI 논문 책',          state: '수락 대기'  },
    ],
    active: [
      { peer: '두비',  books: 3, lastActivity: '5분 전' },
      { peer: '리아',  books: 1, lastActivity: '2시간 전' },
    ],
  },

  // Notification center entries
  notifications: [
    { type: 'reaction', who: '두비', body: '"Figma Variables 완벽 가이드"에 🔥 리액션',  at: '방금'   },
    { type: 'link',     who: '리아', body: '"리아와의 영화 책"에 새 링크를 추가했어요',     at: '12분 전' },
    { type: 'd-3',      who: null,   body: '"두비와의 디자인 책"이 3일 후 종료돼요',         at: '오늘'   },
    { type: 'wow',      who: '두비', body: '"선형 대수학의 직관적 이해"를 와 모먼트로 남겼어요', at: '어제' },
  ],
};
