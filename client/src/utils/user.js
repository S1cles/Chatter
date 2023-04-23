
import  jwt_decode  from 'jwt-decode';

export default localStorage.getItem("token")
? jwt_decode(localStorage.getItem("token"))
: null; 
