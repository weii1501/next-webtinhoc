export const article = `
Django là một framework phổ biến trong giới lập trình web đặc biệt là ở phương Tây. Trong suốt 20 năm, nó dần trở nên quan trọng và có chỗ đứng vững chắc khi đứng sau nhiều dự án lớn thành công trên thế giới.
          Django là gì?
          Django là một framework ra đời để việc thiết kế một trang web sử dụng Python trở nên dễ dàng và thuận tiện cho lập trình viên hơn. Django giúp lập trình viên tập trung và việc viết ứng dụng mà bỏ qua các thao tác không cần thiết khác.

          Django sử dụng mô hình MVT (Model Views Template) một mô hình phổ biến với các trang web hay phần mềm. Trong đó:

          Model (M) là mô phỏng của dữ liệu. Nó là một thể hiện của dữ liệu và là nơi để chúng ta thao tác với dữ liệu thật sự. Model cho phép chúng ta lưu dữ liệu vào DB và không cần hiểu những hoạt động sâu xa bên dưới. Hơn nữa, model cung cấp cho chúng ta cách thức thao tác với DB rất đơn giản, khiến cho một model có thể sử dụng với rất nhiều DB khác nhau. Model hoạt động dưới tên file models.py trong project django

          View (V) như một hàm hoặc phương thức để thực hiện các truy vấn, gọi hàm, tìm kiếm dữ liệu, như một cầu nối giữa Model và Template. View hoạt động dưới tên file views.py

          Template (T) là những gì được thể hiện ra với người dùng - dữ liệu, thông tin. Template thường là file .html Với việc sử dụng mô hình MVT, quá trình thực hiện thiết kế trang web sẽ có logic và trật tự hơn. Chúng ta biết cần tương tác với những file, model nào, dễ dàng xử lý khi gặp bug hay sự cố.

          Điểm mạnh của Django
          Đơn giản - Tiết kiệm thời gian code
          Django thực hiện tối ưu mọi thao tác cho lập trình viên, bỏ qua các bước rườm rà và tập trung vào các chức năng chính của chương trình, nhìn vào hình bên dưới, ta thấy cấu trúc file của Django rất rõ ràng và có cấu trúc, lập trình viên sẽ kiểm soát được chương trình và luồng chạy của chương trình.
          Screen Shot 2023-02-23 at 11 41 32Hình 1: Cấu trúc file một project

          Với cấu trúc file như (Hình 1), khi muốn thực hiện viết một trang web đơn giản, trước hết phần Front-end tương tác với người dùng, tạo yêu cầu qua urls.py, tiếp đến chuyển yêu cầu cho views.py và views.py sẽ thực hiện trao đổi với models.py và template (.html) để thực hiện điều hướng và phản hồi lại với người dùng (Hình 2)
          Hình 2: Cấu trúc thực thi của Django

          Django tuân thủ và được phát triển theo 2 quy tắc: DRY and KISS. là Don’t Repeat Yourself và Keep It Short and Simple do vậy chương trình sẽ được tối ưu, đơn giản, và dễ hiểu, DRY cho giúp lập trình viên tái sử dụng code tránh các rủi ro và lỗi phát sinh, KISS giúp chương trình ngắn gọn và đơn giản
          Tính an toàn, bảo mật cao
          Django có Long-term Support luôn cập nhật nhằm duy trì tính an toàn, bảo mật của hệ thống.

          Các tính năng bảo mật trước các lỗ hổng như Clickjacking, XSS, CSRF, and SQL injection,... đều được Django thiết lập sẵn, lập trình viên không cần phải mất nhiều thời gian cho việc bảo mật này.

          Cộng đồng hỗ trợ lớn và tài liệu
          Là framework mã nguồn mở và với sự phát triển hơn 15 năm Django có một trao đổi lớn, mọi khó khăn hay thắc mắc đều có thể tìm được sự trợ giúp trên trang community của Django
          Khả năng phù hợp, tương thích với nhiều dự án
          Django có khả năng xử lý lưu lượng và khối lượng dữ liệu lớn, hoạt động đa nền tảng từ Windows, Linux, MacOS
          Nhược điểm của Django
          Khả năng xử lý yêu cầu
          Vì là một framework nên khi xử lý càng nhiều dữ liệu thì hiệu suất sẽ càng chậm

          Khi xử lý quá nhiều yêu cầu cùng lúc thì Django phải tạo ra quy trình riêng lẻ để xử lý các yêu cầu từ đó làm tăng thời gian xử lý chương trình.

          Không có quy ước về cấu hình
          Django không sử dụng quy ước chung nào, do đó các quá trình phát triển sẽ gặp khó khăn trong khâu lắp ghép các thành phần và từ đó có thể ảnh hưởng đến tiến độ dự án.
          Không phù hợp với các dự án nhỏ
          Như đã đề cập ở ưu điểm, Django có nhiều tính năng phức tạp, khả năng xử lý phù hợp với dự án lớn do đó với các dự án nhỏ không cần đến những tính năng phức tạp và xử lý quá nhiều dữ liệu, thì Django sẽ làm hiệu suất trang web giảm.
          Do mọi thứ về bảo mật được thiết lập sẵn nên khó có thể can thiệp sâu vào bảo mật của hệ thống
          Kỹ năng và công nghệ cần có để làm việc với Django
          Kỹ năng cứng
          Code Python

          Kiến thức về giao diện người dùng UI/UX, HTML, CSS, Bootstrap, javascript,...

          Quản lý các cơ sở dữ liệu như MySQL or PostgreSQL, mongoDB

          Thành thạo sử dụng git, github cho các dự án

          Sử dụng các framework testing như unittest, Pytest

          Biết sử dụng các máy chủ web như nginx & Apache

          Đọc tài liệu tiếng anh

          Kỹ năng mềm
          Quản lý thời gian

          Giao tiếp, làm việc nhóm, quản lý dự án

          Tư duy tiếp cận và xử lý vấn đề

          Kiên trì :V

          Kết Luận
          Django là một Framework tốt cho việc lập trình, phát triển web. Django nhanh, linh hoạt với đầy đủ các module chức năng, có tính bảo mật tốt, song có một vài hạn chế bên cạnh nhưng Django vẫn đang là một framework hỗ trợ phát triển web hàng đầu.
          `
