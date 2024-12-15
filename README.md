# Nailo - FE

#### 오늘 고른 네일, 예약은 바로 내일로.
> 해당 프로젝트는 **인하대학교 2024년 2학기 캡스톤 디자인** 출품작 **네일로**의 Front-end codebase 입니다.

<img width="2392" alt="github thumbnail" src="https://github.com/user-attachments/assets/5d9cb948-b5a2-46d6-9da4-a43799071f95" />

<br/>

<p align=center>
  <a href="https://astonishing-process-854.notion.site/Nailo-330ef8aba99a4dac8f153477326240a3?pvs=4">노션</a>
  &nbsp; | &nbsp;
  <a href="https://www.figma.com/design/1r0S37WhSpZC6ldGndlnFB/%EC%BB%B4%ED%93%A8%ED%84%B0%EA%B3%B5%ED%95%99-%EC%A2%85%ED%95%A9%EC%84%A4%EA%B3%84?node-id=1-462&t=3joj3zMfhCBljxAB-1">피그마</a>
  &nbsp; | &nbsp; 
  <a href="https://www.youtube.com/watch?v=DIJD7qWA_I4">시연 영상</a>
  &nbsp; | &nbsp; 
  <a href="https://nailo-dev.netlify.app/">서비스 링크</a>
  &nbsp; | &nbsp; 
  <a href="https://main--nailo-dev.netlify.app/">정적 페이지 링크</a>
</p>

<br/>

## Tech Stack

<table>
  <thead>
    <tr>
      <th>category</th>
      <th>stack</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p align="center">Language</p>
      </td>
      <td>
        <img
          src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=ffffff"
        />
        <img src="https://img.shields.io/badge/ESLint-4B32C3?logo=Eslint" />
        <img
          src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=ffffff"
        />
        <img
          src="https://img.shields.io/badge/.ENV-ECD53F?logo=.ENV&logoColor=ffffff"
        />
      </td>
    </tr>
    <tr>
      <td>
        <p align="center">Package Manager</p>
      </td>
      <td>
        <img
          src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=ffffff"
        />
      </td>
    </tr>
    <tr>
      <td>
        <p align="center">Framework</p>
      </td>
      <td>
        <img
          src="https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=ffffff"
        />
        <img
          src="https://img.shields.io/badge/Vite-646CFF?logo=Vite&logoColor=ffffff"
        />
      </td>
    </tr>
    <tr>
      <td>
        <p align="center">Styling</p>
      </td>
      <td>
        <img
          src="https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=ffffff"
        />
      </td>
    </tr>
    <tr>
      <td>
        <p align="center">State Management</p>
      </td>
      <td>
        <img
          src="https://img.shields.io/badge/Recoil-3578E5?logo=recoil&logoColor=ffffff"
        />
      </td>
    </tr>
    <tr>
      <td>
        <p align="center">HTTP Client</p>
      </td>
      <td>
        <img
          src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=ffffff"
        />
      </td>
    </tr>
    <tr>
      <td>
        <p align="center">Deployment</p>
      </td>
      <td>
        <img
          src="https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=ffffff&"
        />
      </td>
    </tr>
    <tr>
      <td>
        <p align="center">Collaboration</p>
      </td>
      <td>
        <img src="https://img.shields.io/badge/Notion-000000?logo=Notion" />
        <img
          src="https://img.shields.io/badge/Figma-F24E1E?logo=Figma&logoColor=ffffff"
        />
      </td>
    </tr>
  </tbody>
</table>



<br/>

## File Structure
```md
.
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── netlify.toml  # Configuration file for Netlify deployment
├── package.json
├── postcss.config.js
├── public/
│   └── images/ # Directory for mock data images
│       ├── aiResult/
│       ├── nail/
│       └── shop/
├── mock/ # Directory for mock data
├── README.md
├── src/
│   ├── App.tsx
│   ├── assets/
│   ├── components/ # Directory for reusable components
│   ├── global.css # Global CSS styles
│   ├── hooks/ # Directory for custom React hooks
│   ├── main.tsx
│   ├── pages/ # Directory for page components
│   ├── stores/ # Directory for state management stores
│   ├── types/ # Directory for TypeScript type definitions
│   ├── utils/ # Directory for utility functions
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

<br/>

## Page Wireframe
> 프로젝트에 필요할 것으로 예상되는 페이지들에 대한 와이어프레임을 구성했습니다.  
> 자세한 페이지별 구성은 [여기](https://www.figma.com/design/1r0S37WhSpZC6ldGndlnFB/%EC%BB%B4%ED%93%A8%ED%84%B0%EA%B3%B5%ED%95%99-%EC%A2%85%ED%95%A9%EC%84%A4%EA%B3%84?node-id=1-462&t=3joj3zMfhCBljxAB-1)서 확인하실 수 있습니다.

![image](https://github.com/user-attachments/assets/5e363dbf-26f0-4266-a6b8-f6d116844c93)

<br/>

## Page Design
> 와이어프레임을 바탕으로 실제로 구현할 페이지에 대한 디자인을 진행했습니다.  
> 전반적인 디자인은 '무신사' 메인 페이지를 참고했습니다.  
> 자세한 페이지별 구성은 [여기](https://www.figma.com/design/1r0S37WhSpZC6ldGndlnFB/%EC%BB%B4%ED%93%A8%ED%84%B0%EA%B3%B5%ED%95%99-%EC%A2%85%ED%95%A9%EC%84%A4%EA%B3%84?node-id=1-462&t=3joj3zMfhCBljxAB-1)서 확인하실 수 있습니다.

![image](https://github.com/user-attachments/assets/a1b7c928-0d21-4d2d-ac74-d97260f83b91)

