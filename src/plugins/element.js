import Vue from 'vue'
import { Button,
				 Container,
				 Header,
				 Aside,
				 Main,
				 Row,
				 Col,
				 Menu,
				 MenuItem,
				 Input,
				 Card,
				 Tag,
				 Divider,
				 Carousel,
				 CarouselItem,
				 Message,
				 Notification,
				 Slider,
				 Loading,
				 Table,
				 TableColumn,
				 Pagination,
				 Tooltip,
				 Dialog,
				 Form,
				 FormItem,
				 Avatar
				} from 'element-ui'

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Slider);
Vue.use(Loading);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Tooltip);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Avatar);
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;