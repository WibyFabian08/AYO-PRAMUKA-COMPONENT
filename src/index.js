import './index.css'

import Badge from './components/basics/Badge.vue'
// import InputText from './components/basics/InputText.vue'
import InputText from './components/InputText/index.vue'
import InputDate from './components/InputDate/index.vue'
import InputNumber from './components/InputNumber/index.vue'
import InputSelect from './components/InputSelect/index.vue'
import InputTextArea from './components/InputTextArea/index.vue'
import CheckboxText from './components/basics/CheckboxText.vue'
import ImageView from './components/basics/ImageView.vue'
import InfiniteScrollContainer from './components/basics/InfiniteScrollContainer.vue'
import InputOtp from './components/basics/InputOtp.vue'
// import InputSelect from './components/basics/InputSelect.vue'
import Modal from './components/basics/Modal.vue'
import MultipleSelect from './components/basics/MultipleSelect.vue'
import MultiSelect from './components/basics/MultiSelect.vue'
// import Pagination from './components/basics/Pagination.vue'
import Select from './components/basics/Select.vue'
import Select2 from './components/basics/Select2.vue'
import Spinner from './components/basics/Spinner.vue'
import Tab from './components/basics/Tab.vue'
import Timelines from './components/basics/Timelines.vue'
import Toggle from './components/basics/Toggle.vue'
// import UploadFile from './components/basics/UploadFile.vue'
import Button from './components/commons/Button.vue'
import EmojiPicker from './components/commons/EmojiPicker.vue'
import GlobalLoading from './components/basics/GlobalLoading.vue'
import Table from './components/Table/index.vue'
import Switch from './components/basics/Switch.vue'
import NoData from './components/commons/NoData.vue'
import TextEditor from './components/commons/TextEditor.vue'
import Pagination from './components/Pagination/index.vue'
import SelectKwartir from './components/SelectKwartir/index.vue'
import PageLoader from './components/commons/PageLoader.vue'
import RenderImage from './components/commons/RenderImage.vue'
import DropdownButton from './components/commons/DropdownButton.vue'
import RenderList from './components/commons/RenderList.vue'
import InputPassword from './components/InputPassword/index.vue'
import UploadFile from './components/UploadFile/index.vue'

const components = [Badge,
  InputText, CheckboxText, ImageView, InfiniteScrollContainer, InputOtp, InputSelect, Modal, MultipleSelect, MultiSelect, Pagination, Select, Select2, Spinner,
  Tab, Timelines, Toggle, UploadFile, Button, EmojiPicker, GlobalLoading, InputDate, InputNumber, InputTextArea,
  Table, Switch, NoData, TextEditor, SelectKwartir, PageLoader, RenderImage, DropdownButton, RenderList, InputPassword]

export {
  Badge,
  InputText, CheckboxText, ImageView, InfiniteScrollContainer, InputOtp, InputSelect, Modal, MultipleSelect, MultiSelect, Pagination, Select, Select2, Spinner,
  Tab, Timelines, Toggle, UploadFile, Button, EmojiPicker, GlobalLoading, InputDate, InputNumber, InputTextArea,
  Table, Switch, NoData, TextEditor, SelectKwartir, PageLoader, RenderImage, DropdownButton, RenderList, InputPassword
}

export default {
  install(app) {
    components.forEach((component) => {
      app.component(component.name, component)
    })
  }
}