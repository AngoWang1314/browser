import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  DatePicker,
  Form,
  FormItem,
  Tag,
  Icon,
  Row,
  Col,
  Upload,
  Steps,
  Step,
  Container,
  Header,
  Aside,
  Main,
  Link,
  Image,
  PageHeader,
  Loading,
  Message,
  MessageBox
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small' }

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Link)
Vue.use(Image)
Vue.use(PageHeader)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
