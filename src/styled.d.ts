// import original module declarations
import 'styled-components';
//@types 가 없으면 이런식으로 .d.ts파일에 모듈선언
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
        textColor:string;
        bgColor:string;
        accentColor:string;
    
  }
}