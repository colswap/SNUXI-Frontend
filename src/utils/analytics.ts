import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

/** 퍼널 이벤트 — GA4 자동 리포트용 */
export const trackEvent = {
  /** 로그인 성공 (세션 시작) */
  login: () => logEvent(analytics, 'login'),

  /** 팟 생성 */
  createPot: (params: { departureId: number; destinationId: number }) =>
    logEvent(analytics, 'create_pot', params),

  /** 팟 상세 조회 (카드 클릭) */
  viewPot: (potId: number) =>
    logEvent(analytics, 'view_pot', { pot_id: potId }),

  /** 팟 참여 (조인 확정) */
  joinPot: (potId: number) =>
    logEvent(analytics, 'join_pot', { pot_id: potId }),

  /** 카카오 택시 호출 클릭 */
  callTaxi: (potId: number) =>
    logEvent(analytics, 'call_taxi', { pot_id: potId }),

  /** 알림 권한 허용 */
  enableNotification: () => logEvent(analytics, 'enable_notification'),

  /** QR 유입 (go 페이지 경유 시) */
  qrLanding: (code: string) =>
    logEvent(analytics, 'qr_landing', { qr_code: code }),
};
