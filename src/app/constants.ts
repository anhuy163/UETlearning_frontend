/* PATH */

export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const HOME_PATH = "/";
export const PROFILE_PATH = "/me";
export const MESSAGE_PATH = "/message";
export const STATISTICS_PATH = "/statistics";
export const QANDA_PATH = "/q-and-a";
export const NOTIFICATION_PATH = "/notifications";
export const PAYMENT_PATH = "/payment";
export const FORGOT_PASSWORD_PATH = "/forgot-password";
export const SERVER_URL =
  "http://learning-application.online/ums/session/teacher";
export const SERVER_BASE_URL = "http://learning-application.online";

/* BREADCRUMB  */

type BreadcrumbMap = {
  [key: string]: string;
};

export const BREADCRUMB_NAME_MAPPING: BreadcrumbMap = {
  [PROFILE_PATH]: "Hồ sơ",
  [MESSAGE_PATH]: "Tin nhắn",
  [STATISTICS_PATH]: "Thống kê",
  [QANDA_PATH]: "Hỏi đáp",
  [NOTIFICATION_PATH]: "Thông báo",
  [HOME_PATH]: "Trang chủ",
  [PAYMENT_PATH]: "Thanh toán",
};

/* AVATAR  */

export const AVATAR_SIZE = {
  LARGE: 128,
  AVERAGE: 64,
  SMALL: 50,
  TINY: 30,
};

/* CHAT  */
export const MESSAGE_FROM_TYPE = {
  FRIEND: "friend",
  ME: "me",
};

/* COLORS */
export const COLORS = {
  CYAN600: "#06b6d4",
};

/* SUBJECTS */
export const SUBJECTS = [
  { value: "Toán học", label: "Toán học" },
  { value: "Ngữ văn", label: "Ngữ văn" },
  { value: "Ngoại ngữ", label: "Ngoại ngữ" },
  { value: "Vật lí", label: "Vật lí" },
  { value: "Hóa học", label: "Hóa học" },
  { value: "Sinh học", label: "Sinh học" },
  { value: "Địa lí", label: "Địa lí" },
  { value: "Lịch sử", label: "Lịch sử" },
  { value: "GDCD", label: "GDCD" },
];

/* GRADE */

export const GRADE = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
];

/* GENDER */
export const GENDER = [
  { value: 1, label: "Nam" },
  { value: 2, label: "Nữ" },
];
/* POST */
export const POST_OPTIONS = [
  { value: "1", label: "Tất cả" },
  { value: "2", label: "Khối giảng dạy của bạn" },
];
/* ERROR MESSAGES */

export const ERROR_MESSAGE = {
  CONFRIM_PASSWORD: "Mật khẩu nhập lại không khớp",
  LOGIN: "Tài khoản hoặc mật khẩu không đúng",
  INVALID_EMAIL: "Email đăng ký đã tồn tại",
  DELETE_EVENT: "Xóa sự kiện thất bại",
  CHANGE_PASSWORD_CF: "Mật khẩu mới nhập lại không khớp",
  CHANGE_PASSWORD: "Mật khẩu hiện tại không hợp lệ",
  FORGOT_PASSWORD: "Email đăng ký tài khoản hoặc tên tài khoản không hợp lệ",
  UPDATE_EVENT: "Email không tồn tại trong hệ thống",
  REPORT: 'Gửi báo cáo thất bại, vui lòng kiểm tra lại Internet',
  DEACTIVE_ACCOUNT:'Tài khoản này đã bị vô hiệu hóa, kiểm tra hòm thư để biết thêm thông tin'
};

/* SUCCESSFUL MESSAGES */

export const SUCCESSFUL_MESSAGE = {
  REGISTER: "Đăng ký thành công",
  LOGIN: "Đăng nhập thành công",
  EVENT_DELETE: "Xóa sự kiện thành công",
  EVENT_CREATE: "Cập nhật sự kiện thành công",
  EVENT_UPDATE: "Cập nhật sự kiện thành công",
  CHANGE_PASSWORD: "Cập nhật mật khẩu thành công",
  FORGOT_PASSWORD:
    "Mật khẩu mới đã được gửi về hòm thư của bạn, vui lòng kiểm tra",
  REPORT: "Gửi báo cáo học sinh thành công",
  PAYMENT:
    "Gửi yêu cầu thanh toán thành công, email thông báo sẽ đến hòm thư của bạn trong vòng 3 ngày",
  
};

/* TOKEN EXPIRATION CHECK PERIOD */
export const TOKEN_EXPIRATION_CHECK_PERIOD_MS = 300000;

/* TEXT */
export const TEXT = {
  BEST_ANSWER: "Câu trả lời hay nhất",
  DIRECT_TO_POST: "Xem chi tiết bài viết",
  DELETE_EVENT_WARNING: "Bạn có muốn xóa sự kiện này không?",
  CANCEL: "Hủy bỏ",
  OK: "Đồng ý",
  ADD_EVENT_TITLE: "Thêm sự kiện",
  EDIT_EVENT_TITLE: "Chỉnh sửa sự kiện",
  VERIFY_MESSAGE:
    "Tài khoản của bạn đang được xác thực, vui lòng chờ thông báo đến hòm thư điện tử của bạn",
  ANSWER_NOTI: " đã chọn câu trả lời của bạn là hay nhất",
  CALL_NOTI: "Bạn sẽ có buổi giảng dạy sau 1 tiếng nữa với",
  DEACTIVE_ACCOUNT:'Tài khoản của bạn đã bị vô hiệu hóa, vui lòng kiểm tra hòm thư để biết thêm thông tin'
};

export const MIN_SUM_OF_POINTS = 10000;

/* BANK */
export const BANK_OPTIONS = [
  { value: "BIDV", label: "BIDV - Ngân hàng đầu tư và phát triển" },
  { value: "VCB", label: "VCB - Ngân hàng TMCP Ngoại thương VN" },
  { value: "TCB", label: "TCB - Ngân hàng TMCP Kỹ thương VN" },
  {
    value: "AGR",
    label: "Agribank - Ngân hàng Nông nghiệp và Phát triển Nông thôn VN",
  },
  { value: "MB", label: "MBBank - Ngân hàng quân đội" },
];

/* VI LOCALE */

export const VI_LOCALE = {
  months:
    "Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12".split(
      "_"
    ),
  monthsShort:
    "Th 1_Th 2_Th 3_Th 4_Th 5_Th 6_Th 7_Th 8_Th 9_Th 10_Th 11_Th 12".split("_"),
  weekdays: "Chủ nhật_Thứ hai_Thứ ba_Thứ tư_Thứ năm_Thứ sáu_Thứ bảy".split("_"),
  weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM [năm] YYYY",
    LLL: "D MMMM [năm] YYYY HH:mm",
    LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
  },
  calendar: {
    sameDay: "[Hôm nay lúc] LT",
    nextDay: "[Ngày mai lúc] LT",
    nextWeek: "dddd [tuần tới lúc] LT",
    lastDay: "[Hôm qua lúc] LT",
    lastWeek: "dddd [tuần rồi lúc] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "%s sau",
    past: "%s trước",
    s: "vài giây",
    ss: "%d giây",
    m: "1 phút",
    mm: "%d phút",
    h: "1 giờ",
    hh: "%d giờ",
    d: "1 ngày",
    dd: "%d ngày",
    w: "1 tuần",
    ww: "%d tuần",
    M: "1 tháng",
    MM: "%d tháng",
    y: "1 năm",
    yy: "%d năm",
  },
  ordinal: (n: any) => `${n}`,
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
};

/* POINT POPUP */
export const POINT_EXPLAIN = {
  TITLE:
    "Points hay còn gọi là điểm tích lũy là phần thưởng mà các giáo viên giảng dạy qua ứng dụng UET LEARNING sẽ nhận được khi đạt được một số yêu cầu của ứng dụng cụ thể như:",
  FUNCTION:
    "Sau khi tích lũy được một lượng điểm, bạn có thể quy đổi thành số tiền (với tỷ lệ 1 point = 10 VND) thông qua mục Thanh toán",
};

/* STATISTICS TYPE */
export const STATISTICS_TYPE = [
  {
    value: "1",
    label: "Tuần hiện tại",
  },
  {
    value: "2",
    label: "Năm hiện tại",
  },
];

export const HIDDEN_PASSWORD = "*******";
export const dummnyData = [
  {
    id: "1",
    name: "An Huy An Huy An HuyAn Huy",
    lastMessage: "HelloHelloHelloHelloHelloHelloHelloHelloHello",
  },
  {
    id: "2",
    name: "An Huy",
    lastMessage: "Hello",
  },
  {
    id: "3",
    name: "An Huy",
    lastMessage: "Hello",
  },
  {
    id: "4",
    name: "An Huy An Huy An HuyAn Huy",
    lastMessage: "HelloHelloHelloHelloHelloHelloHelloHelloHello",
  },
  {
    id: "5",
    name: "An Huy",
    lastMessage: "Hello",
  },
  {
    id: "6",
    name: "An Huy",
    lastMessage: "Hello",
  },
  {
    id: "7",
    name: "An Huy An Huy An HuyAn Huy",
    lastMessage: "HelloHelloHelloHelloHelloHelloHelloHelloHello",
  },
  {
    id: "9",
    name: "An Huy",
    lastMessage: "Hello",
  },
  {
    id: "10",
    name: "An Huy",
    lastMessage: "Hello",
  },
];
export const testAvatarSrc =
  "data:image/jpeg;base64,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";

export const barChartData = {
  label: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  datasets: [
    {
      label: "Điểm đạt được",
      data: [16, 45, 66, 68, 98, 100, 32, 23, 31, 13, 11, 50],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.4)",
    },
  ],
};
