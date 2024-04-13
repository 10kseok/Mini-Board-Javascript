import { JwtModuleOptions } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '1d' },
}

export function convertJwtExpiryDateToCookieExpiryDate(expiresIn: string | number | Date) {
  return convertExpiryDate(expiresIn);
}

function convertExpiryDate(expiresIn: string | number | Date) {
  if (!expiresIn) {
    return null;
  }

  if (typeof expiresIn === 'string') {
    // 문자열 기반 만료 기간 구문 분석
    const interval = expiresIn.slice(-1) as 'm' | 'h' | 'd';
    const duration = parseInt(expiresIn.slice(0, -1));
    
    switch(interval) {
      case 'm':
        expiresIn = duration * 60 * 1000; break; // 분
      case 'h':  
        expiresIn = duration * 60 * 60 * 1000; break; // 시간
      case 'd':
        expiresIn = duration * 24 * 60 * 60 * 1000; break; // 일
    }

  } else if (typeof expiresIn === 'number') {
    // 밀리초로 간주
    expiresIn = expiresIn;

  } else if (expiresIn instanceof Date) {
    // Date 객체면 그대로 반환  
    return expiresIn;
  }

  // 밀리초 기반으로 Date 객체 생성 및 반환
  return new Date(Date.now() + expiresIn);  
}