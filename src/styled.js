import styled, {keyframes} from 'styled-components'

export const Title = styled.h2`
      font-family: 'Poppins', sans-serif;
      // font-weight: bolder;
      letter-spacing: 0.05em;
      font-size:50px;
`

export const Strike = styled.p`
      margin:0;
      padding:0;
      font-family: 'Lato', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 150px;
      color: #36b37e;
`
export const Percent = styled.span`
      font-family: 'Lato', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 80px;
      margin-left:10px;
`
export const CardContainer = styled.div`
      // border: 2px dashed red;
      // width: 100vw;
      display: grid;
      grid-template-columns: repeat(3, auto);
      gap: 25px;
      overflow-y: auto;
      justify-content: center;
      margin-top: 70px;
      -ms-overflow-style: none;  
      scrollbar-width: none;
      &::-webkit-scrollbar {
            display: none;
      }
      @media (max-width: 600px) {
            justify-content: start;
      }
`
export const DayCard = styled.div`
`
export const CardWrapper = styled.div`
      width: 150px;
      border: 1px solid #CED4DA;
      border-radius: 4px;
      padding: 30px 20px;
`
export const Motiv = styled.p`
      margin: 0;
      margin-bottom: 10px;
      padding:0;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 16px;
`
export const DateText = styled.p`
      margin: 0;
      // margin-top: 15px;
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 24px;
`
export const Day = styled.p`
      margin:0;
      margin-top: 10px;
      margin-bottom: 25px;
      font-family: 'Inter', sans-serif;
      font-size: 24px;
`
export const Actions = styled.div``
export const ActionButton = styled.button`
      background: none;
      border: none;
      padding:0;
      cursor:pointer;
      margin: 0 8px;
      outline: none;
      &:disabled {
            opacity: .6
      }
`
const spin = keyframes`
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
`;
export const Loader = styled.div`
      z-index:99;
      position: absolute;
      top: calc(50% - 30px);
      left:calc(50% - 30px);
      // font-family: 'Roboto', sans-serif;
      // margin-right: -50%;
      transform: translate(-40%, -40%);
      border: 10px solid #f3f3f3;
      filter: blur(0px);
      border-radius: 50%;
      border-top: 10px solid #3498db;
      width: 60px;
      // background: #ffff;
      height: 60px;
      -webkit-animation: ${spin} 1.5s linear infinite;
      animation: ${spin} 1.5s linear infinite;
`
export const LoaderContainer = styled.div`
      position: absolute;
      width: 100%;
      height: 100vh;
      top: 0;
      left: 0;
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
      background-color: rgba(0, 0, 0, 0.11);
`
