//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';

//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/user';
const instance = axios.create({ baseURL })

export default instance;