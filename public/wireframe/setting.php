<?php
session_start();
include "../php/config.php";
if (!isset($_SESSION['loggedin'])) {
    header("location:/index.php");
}

$username = $_SESSION["username"];

$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc(); // <-- This line was missing

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $newUsername = trim($_POST['username']);
    $newEmail = trim($_POST['email']);

    // Optional: Add validations here
    echo "sub";
    $updateStmt = $conn->prepare("UPDATE users SET username = ?, email = ? WHERE username = ?");
    $updateStmt->bind_param("sss", $newUsername, $newEmail, $username);

    if ($updateStmt->execute()) {
        // Update session username if it was changed
        $_SESSION['username'] = $newUsername;
        header("Location: setting.php?updated=1");
        exit();
    } else {
        echo "<script>alert('Failed to update. Try again.');</script>";
    }
}
$stmt = $conn->prepare("INSERT INTO users (username, email, token) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $token);

// Later in the success block:
// $verifyLink = "http://yourdomain.com/php/verify.php?token=$token";
// mail($newEmail, "Verify your email", "Click the link to verify: $verifyLink");

// echo $user;
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <link href="../assets/css/tailwindstyles.css" rel="stylesheet">
    <link rel="icon" type="image/png" href="../uploads/white-logo.png">

    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <style>
        span{
            color: red;
        }
        span i {
            color: green;
            /* font-size: 2em; */
        }
    </style>
</head>

<body class="bg-gray-100">
    <header class="sticky top-0 bg-[#101828]   shadow-[1px_4px_24px_#000]">
        <div class="flex items-center justify-between px-6 py-4">
            <a href="../index.php">
                <img src="../uploads/logo.png" alt="Logo" class="h-12 w-12 invert">
            </a>
            <nav class="space-x-6  md:flex">
                <a href="../index.php" class="text-white">Home</a>
                <a href="../wireframe/editor.php" class="text-white">Editor</a>
                <a href="../php/logout.php" class="text-white">Logout</a>
            </nav>
        </div>
    </header>
    <div class="container mx-auto p-6">
        <h4 class="text-xl font-bold mb-4">Account Settings</h4>
        <div class="bg-white shadow-md rounded-lg p-6 md:flex md:space-x-0">
            <div class="md:w-1/4 w-full border-b-gray-500 md:border-b-0  pb-4 md:pb-0">
                <div class="space-y-4">
                    <a class="block p-2 bg-blue-500 text-white rounded-md" href="setting.php">General</a>
                    <a class="block p-2 hover:bg-gray-200 rounded-md" href="password.php">Change Password</a>
                    <a class="block p-2 hover:bg-gray-200 rounded-md" href="draft.php">Draft</a>
                </div>
            </div>
            <div class="md:w-3/4 w-full p-6">
                <div id="account-general">
                    <div class="flex flex-wrap items-center space-x-4 mb-4">
                        <img src="../uploads/profile.svg" class="h-20 w-20 rounded-full" id="profile-pic">
                        <div class="mt-4 md:mt-0">
                            <label class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md inline-block">
                                Upload new photo
                                <input type="file" class="hidden" id="input-file">
                            </label>
                            <button class="ml-2 px-4 py-2 bg-gray-300 rounded-md" id="rest-pic">Reset</button>
                            <p class="text-gray-500 text-sm mt-1">Allowed JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                    </div>
                    <hr class="border-gray-300 my-4">
                    <form action="" method="post">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-gray-700">Username</label>
                                <input type="text" class="w-full p-2 border rounded-md"  id="userName" onkeyup="validateUserName()"  placeholder="Enter your username"   value="<?php echo htmlspecialchars($user['username']); ?>" >
                                <span id="username-error"> </span>

                            </div>
                            <!-- <div>
                                <label class="block text-gray-700">Name</label>
                                <input type="text" class="w-full p-2 border rounded-md"  id="fullName" onkeyup="validateName()"  placeholder="Enter your full name">
                                <span id="name-error"> </span>

                            </div> -->
                            <!-- <div>
                                <label class="block text-gray-700 ">Phone Number</label>
                                <input type="text" class="w-full p-2 border rounded-md"id="phone" onkeyup="validatePhone()" placeholder="Enter your phone number" >
                                <span id="phone-error"> </span>

                            </div> -->
                            <div>
                                <label class="block text-gray-700">E-mail</label>
                                <input type="email" class="w-full p-2 border rounded-md" id="email" onkeyup="validateEmail()" placeholder="Enter your email" value="<?php echo htmlspecialchars($user['email']); ?>" />
                                <span id="email-error"> </span>
                                <?php if ($user['email_verified'] == 0): ?>

                                  <div class="bg-yellow-200 text-yellow-700 p-2 mt-2 rounded-md">
                                Your email is not confirmed. Please check your inbox.<br>
                                 <a href="../php/resend.php" class="text-blue-500">Resend confirmation</a>
                                  </div>

                                 <?php else: ?>
                                  <div class="bg-green-100 text-green-700 p-2 mt-2 rounded-md">
                                ✅ Your email is verified.
                             </div>
                           <?php endif; ?>

                            </div>
                            <div>
                                <button type="submit"
                                    class="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer ">Save
                                    Change</button>
                            </div>
                            <div>
                                <button type="reset"
                                    class="w-full  text-white bg-gray-600 hover:bg-red-500 cursor-pointer focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 text-center  ">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="../assets/js/setting.js"></script>
    <script src="../assets/js/profile.js"></script>
</body>

</html>