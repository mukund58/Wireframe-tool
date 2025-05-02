<?php
session_start();
require 'config.php'; // relative to current file
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms and Conditions</title>
    <link href="../assets/css/tailwindstyles.css" rel="stylesheet">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="../assets/css/styles.css">
    <link rel="stylesheet" href="../assets/css/utilities.css">
    <link href="assets/css/tailwindstyles.css" rel="stylesheet">
    <link rel="icon" type="image/png" href="../uploads/white-logo.png"  >

</head>
<body class="bg-gray-100">
<header class="sticky-header">

<div class="navigation">
    <div class="logo">
      <h1><a href="/index.php"><img src="/uploads/logo.png" width="50px" height="50px" alt="Logo "></a></h1>
    </div>

 

    <div class="menubar">
      <input type="checkbox" id="hamburger-checkbox" style="display: none;">
      <label for="hamburger-checkbox">

      <?php if (isset($_SESSION['username']) && !empty($_SESSION['username'])) { ?>
        <img src="../pic/<?= htmlspecialchars($user['profile_pic']) ?>" class="h-10 w-10 rounded-full object-cover" id="profile-pic" onerror="this.onerror=null;this.src='../uploads/avatar.svg'";">
        <?php } else { ?>
            <h1><i class='menu-icon bx bx-menu-alt-right text-5xl'></i></h1>
            <?php } ?>
      </label>


      <nav class="nav-user">
        <label for="hamburger-checkbox">
          <img class="close-icon" src="/uploads/close-icon.svg" alt="close-icon">
        </label>

        <?php if (isset($_SESSION['username']) && !empty($_SESSION['username'])) { ?>
        <a href="/wireframe/setting.php">Profile</a>
        <a href="/wireframe/draft.php">Dashboard</a>
        <?php } ?>
        <?php if (isset($_SESSION['username']) && !empty($_SESSION['username'])) { ?>
          <a id="logout" href="/php/logout.php">Log Out</a>
        <?php } else { ?>
          <a id="loginOpenModal" href="#user-login">Login</a>
          <a id="signUpopenModal">Sign Up Free</a>
        <?php } ?>
      </nav>
    </div>
  </div>
</header>

    <div class="container mx-auto p-6 m-20">
    <div class="bg-white shadow-md rounded-lg p-6 md:flex md:space-x-6">
            <div class="md:w-1/4 w-full border-b-gray-500 md:border-b-0  pb-4 md:pb-0">
                <div class="space-y-4">
                    <a class="block p-2 bg-blue-500 text-white  rounded-md" href="terms-of-service.php">Terms and Conditions</a>
                    <a class="block p-2 hover:bg-gray-200 text-black rounded-md" href="privacy-policy.php">Privacy Policy</a>
                </div>
            </div>
            <div class="md:w-3/4 w-full p-6 text-black">
                <div id="account-general ">
                  
                    <hr class="border-none my-4">
                    <div class="space-y-4">
                    <h1 class="text-3xl font-bold mb-4">Terms and Conditions</h1>
                    <p class="mb-4 " >
                    By accessing and using <strong>mukund.xyz</strong>, you agree to the following terms:
                    </p>

                    <ul class="list-disc pl-5 mb-4 space-y-2">
                    <li><strong>Use of Service:</strong> This tool allows you to create and save wireframe drafts for personal and professional purposes.</li>
                    <li><strong>User Accounts:</strong> You must provide accurate information and keep your login credentials safe. You’re responsible for activity under your account.</li>
                    <li><strong>Content:</strong> You retain ownership of content you upload (profile pictures, drafts). We store this securely and only show it to you.</li>
                    <li><strong>Restrictions:</strong> Do not upload harmful or illegal content or misuse the platform.</li>
                    <li><strong>License:</strong> This site and codebase are under GNU GPL v3.0.</li>
                    <li><strong>Termination:</strong> We reserve the right to terminate accounts violating our terms.</li>
                    <li><strong>Liability:</strong> We are not liable for data loss or service interruption.</li>
                    </ul>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
    <footer class="text-white body-font my-">
      <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a class="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <img class="w-10 h-10 text-white p-2 bg-white rounded-full" src="../uploads/logo.png" alt="">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl">Design Frame</span>
        </a>
        <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2025
          Design Frame —
          <a href="https://github.com/mukund58" class="text-gray-600 ml-1" rel="noopener noreferrer"
            target="_blank">@Mukund</a>
          <a href="https://github.com/jaivik2005" class="text-gray-600 ml-1" rel="noopener noreferrer"
            target="_blank">@Javik</a>
        </p>
        <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a class="text-gray-500" href="https://github.com/mukund58/Wireframe-tool" target="_blank"><i
              class='bx bxl-github text-3xl'></i></a>
        </span>
      </div>
    </footer>
  </div>

</body>
</html>
