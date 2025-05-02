<?php
session_start();
require 'config.php';  // relative to current file

$dotenv = Dotenv\Dotenv::createImmutable('../../');
$dotenv->load();

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

<div id="loginModal" class="modeal">
  
  <div class="modal-content relative  max-w-md px-4  ">
    
    <div class="close-login flex flex-col">

    <svg class="close h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"></path>
      </svg>
    
      <h2 class="text-xl font-medium text-gray-900">Sign in to our platform</h2>
    </div>
 
    <form onsubmit="return validateForm(event)" action="/php/process_login.php" method="post">
      <div class="form-group ">
        <label for="email">Username</label>
        <input type="text" id="username" placeholder="username" name="username" required >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="••••••••" required class="input-field password" >
      </div>
      <p id="error-message" class="error-message"></p>
      <div class="flex justify-between m-4">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="remember" aria-describedby="remember" type="checkbox" name="remember_me">
          </div>
          <div class="text-sm ml-3">
            <label for="remember" class=" text-gray-900  ">Remember
              me</label>
          </div>
        </div>
        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost
          Password?</a>
      </div>
      <button type="submit"
        class="w-full my-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-3 ">Login
        to your account</button>
        <?php if ($_SESSION['showError']) { ?>
          <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
<p class="font-bold"><?php echo $_SESSION['showError'] ?></p>
</div>
        <?php } ?>
      <div class="text-sm font-medium text-gray-500 cursor-pointer">
        Not registered? <a id="switchToSignup" class="text-blue-700 hover:underline ">Create
          account</a>
        </div>
      </form>
      <div class="bg-white p-8 rounded-2xl  max-w-sm w-full text-center">
        
        <!-- Google Sign-In -->
        <div id="g_id_onload"
        data-client_id="<?php echo $client_id; ?>"
        data-callback="handleCredentialResponse"
        data-auto_prompt="false">
      </div>
      
      <div class="g_id_signin"
      data-type="standard"
      data-size="large"
       data-theme="outline"
       data-text="sign_in_with"
       data-shape="rectangular"
       data-logo_alignment="left"
       data-width="300">
  </div>

</div>
<p class="mb-4 font-medium text-gray-500" >By signing in, you agree with the following terms: <a class="text-blue-700 hover:underline " href="php/terms-of-service.php" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> And <a class="text-blue-700 hover:underline " href="php/privacy-policy.php" target="_blank" rel="noopener noreferrer">Privacy & Policy</a>  </p>

  </div>
</div>

<div id="signUpModal" class="modeal">
  <div class="modal-content relative  max-w-md px-4  ">
    <div class="close-signup flex flex-row-reverse">
    <svg class=" h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"></path>
      </svg>
      <h2 class="text-xl font-medium text-gray-900">Sign Up to our platform</h2>
    </div>
    <form onsubmit="return validateForm(event)" action="./php/process_register.php" method="post">
      <div class="form-group ">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="name@company.com" required>
      </div>
      <div class="form-group ">
        <label for="username">Username</label>
        <input type="username" id="username" name="username" placeholder="username123" required pattern="^[a-z][a-z0-9].{3,15}$" title="Enter Valid Username">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        
        <input type="password" id="password" class="input-field password"  name="password" placeholder="••••••••" required pattern="^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$" title="Enter Strong Password" >
        
      </div>
      <p id="error-message" class="error-message"></p>
      <div class="flex justify-between m-4">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="remember" aria-describedby="remember" type="checkbox" name="remember_me">
          </div>
          <div class="text-sm ml-3">
            <label for="remember" class=" text-gray-900  ">Remember
              me</label>
          </div>
        </div>
        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost
          Password?</a>
      </div>
      <div class="text-sm font-medium text-gray-500 cursor-pointer">
        Already have an account? <a id="switchToSignin" class="text-blue-700 hover:underline ">Login
          account</a>
      </div>
      <button type="submit"
        class="w-full my-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-3 ">Register
        to your account</button>
    </form>
    
    <p class="mb-4 font-small text-gray-500" >By signing up, you agree with the following terms: <a class="text-blue-700 hover:underline " href="php/terms-of-service.php" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> And <a class="text-blue-700 hover:underline " href="php/privacy-policy.php" target="_blank" rel="noopener noreferrer">Privacy & Policy</a>  </p>
  </div>

</div>
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
  <script src="../assets/js/login.js"></script>
  <script src="../assets/js/register.js"></script>
</body>

</html>
