import axios from 'axios';
export function request(config) {
	const instance = axios.create({
		baseURL: 'http://localhost:3000',
		withCredentials: true
	})
	

	// http request 拦截器
  instance.interceptors.request.use(config => {
		if(!config.params) {
			config.params = {};
		}
    return config
  }, err => {
    // console.log(err);
  })
	
	return instance(config);
}