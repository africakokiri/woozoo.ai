"use client";

import { MotionGlobalConfig } from "motion/react";
import { useEffect } from "react";

export default function MotionConfigProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 첫 렌더링에서는 애니메이션 스킵
    MotionGlobalConfig.skipAnimations = true;

    // 다음 프레임에서 애니메이션 활성화
    requestAnimationFrame(() => {
      MotionGlobalConfig.skipAnimations = false;
    });
  }, []);

  return <>{children}</>;
}
