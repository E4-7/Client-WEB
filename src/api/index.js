import axios from 'axios';
const COMMON_BASE_URL = 'https://api.e47app.click/api/';
// const COMMON_SERVER_URL = "https://fdpcommonserver.paas-ta.org/v1/";
// //const RTC_SERVER_URL = process.env.VUE_APP_RTC_SERVER_URL;
// const ML_SERVER_URL = "https://fdpmlserver.paas-ta.org/";

const instance = axios.create({
  // .. congigure axios baseURL
  baseURL: `${COMMON_BASE_URL}`,
});
instance.defaults.withCredentials = true;

// 로그인

// 학생

// 교수
// async function fetchIsValidRoom(id){
//     return await axios.get(`${COMMON_SERVER_URL}room/${id}`);
// }
// async function fetchIsValidManager(id,password){
//     return await axios.post(`${COMMON_SERVER_URL}room/manage`,{
//         id,
//         password
//     });
// }
// async function fetchIsValidRoomManager(id,password){
//     return await axios.post(`${COMMON_SERVER_URL}room/manage/${id}`,{
//         password
//     });
// }

// async function fetchCreateHost(subjectName,hostName,password,openTime,isOpenbook){
//     return await axios.post(`${COMMON_SERVER_URL}room`,{
//         subjectName,
//         hostName,
//         password,
//         isOpenbook,
//         time:openTime
//     });
// }

// //호스트 게스트 목록 리스트 관리
// async function fetchCreateGuestList(lists,roomID){
//     return await axios.post(`${COMMON_SERVER_URL}room/guest-list`,{
//         id:roomID,lists
//     })
// }
// async function fetchGetGuestList(id){
//     return await axios.post(`${COMMON_SERVER_URL}room/guest-list/my`,{
//         id
//     })
// }

// //관리자 시험 시작/중지 관련
// async function fetchONOFFExam(roomId,status){
//     return await axios.post(`${COMMON_SERVER_URL}room/onoff`,{
//         id:roomId,status
//     })
// }

// //파일 업로드 학생
// async function fetchCreateGuestExamFile(roomID,userName,file){
//     console.log(userName,roomID,file);
//     const frm=new FormData();
//     frm.append('file',file);
//     frm.append('roomID',roomID);
//     frm.append('userName',userName);
//     return await axios.post(`${COMMON_SERVER_URL}room/upload`, frm);
// }

// // 머신러닝 관련
// async function fetchStudentMobileCam(image){
//     const myFile = new File([image], "image.jpeg", {
//         type: image.type,
//     });
//     const frm=new FormData();
//     frm.append('image',myFile);
//     return await axios.post(`${ML_SERVER_URL}mobile-detect`,frm);
// }
// async function fetchStudentOCR(image,id,name){
//     const myFile = new File([image], "image.jpeg", {
//         type: image.type,
//     });
//     const frm=new FormData();
//     frm.append('image',myFile);
//     frm.append('id',id);
//     frm.append('name',name);
//     return await axios.post(`${ML_SERVER_URL}ocr`,frm);
// }

// export {
//     fetchIsValidRoom,
//     fetchIsValidManager,
//     fetchStudentOCR,
//     fetchCreateHost,
//     fetchIsValidRoomManager,
//     fetchStudentMobileCam,
//     fetchONOFFExam,
//     fetchCreateGuestList,
//     fetchGetGuestList,
//     fetchCreateGuestExamFile
// }
