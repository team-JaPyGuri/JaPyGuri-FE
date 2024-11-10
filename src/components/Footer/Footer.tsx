const Footer = () => {
  return (
    <footer className="w-full p-4 pb-20 flex flex-col gap-2 bg-grayscale-300 text-grayscale-600">
      <p className="regular-13">© NAILO ALL RIGHTS RESERVED</p>
      <a
        target="_blank"
        href="https://github.com/team-JaPyGuri"
        className="semibold-13 underline"
      >
        Github repository
      </a>
      <p className="regular-13 text-grayscale-500">
        본 플랫폼은 2024년 2학기 인하대학교 '컴퓨터공학 종합설계' 프로젝트로
        제작된 가상의 서비스입니다. 플랫폼에 표시된 네일아트 사진 및 네일업체는
        실제 서비스와 무관하며, 이용이 불가함을 알려드립니다.
      </p>
    </footer>
  );
};

export default Footer;
