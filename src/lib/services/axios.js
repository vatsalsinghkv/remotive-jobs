import axios from 'axios';
import { URL } from '../utils/constant';

export default axios.create({
  baseURL: URL,
});
