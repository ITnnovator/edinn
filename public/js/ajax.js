// Contact form AJAX submission
// $(document).ready(function () {
//     alertify.set('notifier', 'position', 'top-right');

//     $("#contact-form").on("submit", function (e) {
//         e.preventDefault(); // ✅ this stops the page redirect

//         const $form = $(this);
//         const $btn = $("#submit");

//         $btn.prop("disabled", true).text("Sending...");

//         $.ajax({
//             url: $form.attr("action"),
//             method: "POST",
//             data: $form.serialize(),
//             dataType: "json",
//             success: function (res) {
//                 if (res.ok) {
//                     alertify.success(res.message);
//                     $form[0].reset();
//                 } else {
//                     alertify.error(res.message);
//                 }
//             },
//             error: function (xhr) {
//                 alertify.error("Server error. Please try again.");
//                 // Optional debug:
//                 // console.log(xhr.responseText);
//             },
//             complete: function () {
//                 $btn.prop("disabled", false).html('Send Now <i class="fa fa-long-arrow-alt-right"></i>');
//             }
//         });
//     });
// });


// Career form AJAX submission
// $(function () {
//     alertify.set('notifier', 'position', 'top-right');

//     $("#career-form").on("submit", function (e) {
//         e.preventDefault();

//         const $form = $(this);
//         const $btn = $("#career-submit");

//         $btn.prop("disabled", true).text("Submitting...");

//         $.ajax({
//             url: $form.attr("action"),
//             type: "POST",
//             data: $form.serialize(),
//             dataType: "json",
//             success: function (res) {
//                 if (res.ok) {
//                     alertify.success(res.message);
//                     $form[0].reset();
//                 } else {
//                     alertify.error(res.message);
//                 }
//             },
//             error: function () {
//                 alertify.error("Something went wrong. Please try again.");
//             },
//             complete: function () {
//                 $btn.prop("disabled", false).html('Submit Application <i class="fa fa-long-arrow-alt-right"></i>');
//             }
//         });
//     });
// });

// Admission form AJAX submission
// $(function () {

//     alertify.set('notifier', 'position', 'top-right');

//     $("#enrollment-form").on("submit", function (e) {
//         e.preventDefault();

//         const $form = $(this);
//         const $btn = $("#enrollment-submit");

//         $btn.prop("disabled", true).text("Submitting...");

//         $.ajax({
//             url: $form.attr("action"),
//             type: "POST",
//             data: $form.serialize(),
//             dataType: "json",
//             success: function (res) {
//                 if (res.ok) {
//                     alertify.success(res.message);
//                     $form[0].reset();
//                 } else {
//                     alertify.error(res.message);
//                 }
//             },
//             error: function () {
//                 alertify.error("Something went wrong.");
//             },
//             complete: function () {
//                 $btn.prop("disabled", false)
//                     .html('Submit Enrollment <i class="fa fa-long-arrow-alt-right"></i>');
//             }
//         });
//     });

// });