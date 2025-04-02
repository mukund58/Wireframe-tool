<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wireframe Tool</title>
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="stylesheet" href="assets/css/utilities.css">
  <link href="assets/css/tailwindstyles.css" rel="stylesheet">
  <link rel="icon" type="image/png" href="uploads/white-logo.png"  >
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

</head>

<body>
  <header class="sticky-header ">
    <div class="navigation">
      <div class="logo">
        <h1><a href="index.html"><img src="uploads/logo.png" width="50px" height="50px" alt=""></a></h1>
      </div>
      <div class="menubar">
        <input type="checkbox" id="hamburger-checkbox" style="display: none;">
        <label for="hamburger-checkbox">
          <!-- <img class="" src="uploads/avatar.svg" alt="menu-icon"> -->
           <h1>
            <i class='menu-icon bx bx-menu-alt-right text-5xl'></i>

           </h1>
        </label>

        <nav class="nav-user">
          <label for="hamburger-checkbox">
            <img class="close-icon" src="uploads/close-icon.svg" alt="close-icon">
          </label>
          <a href="wireframe/setting.html">Profile</a>
          <a href="wireframe/dashboard.html">Dashboard</a>
          <a href="wireframe/contact.html">Contact Sales</a>

    <!-- Buttons to open the modals -->
    <?php if (!isset($_SESSION['user_id'])): ?>
        <button onclick="openModal('loginModal')">Login</button>
        <button onclick="openModal('signUpModal')">Sign Up</button>
    <?php endif; ?>       
	</nav>
      </div>

    </div>
  </header>


<main>
    <h1>Welcome to the Wireframe Tool</h1>
    <p>Start creating wireframes with our intuitive editor.</p>
    <a href="wireframe/editor.php">Go to Editor</a>
</main>

  <div id="loginModal" class="modeal">
    <div class="modal-content relative  max-w-md px-4  ">
      <div class="close-login flex flex-col">

        <svg class="close h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
        <h2 class="text-xl font-medium text-gray-900">Sign in to our platform</h2>
      </div>
      <form onsubmit="return validateForm(event)" action="./php/process_login.php" method="post">
        <div class="form-group ">
          <label for="email">Email or Username</label>
          <input type="email" id="email" placeholder="name@company.com" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" required>
        </div>
        <p id="error-message" class="error-message"></p>
        <div class="flex justify-between m-4">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="remember" aria-describedby="remember" type="checkbox" required="">
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
        <div class="text-sm font-medium text-gray-500 cursor-pointer">
          Not registered? <a id="switchToSignup" class="text-blue-700 hover:underline ">Create
            account</a>
        </div>
      </form>
    </div>
  </div>
  <div id="signUpModal" class="modeal">
    <div class="modal-content relative  max-w-md px-4  ">
      <div class="close-signup flex flex-row-reverse">
        <svg class=" h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z"
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
          <input type="username" id="username" name="username" placeholder="username123" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="••••••••" required>
        </div>
        <p id="error-message" class="error-message"></p>
        <div class="flex justify-between m-4">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="remember" aria-describedby="remember" type="checkbox" required="">
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
          class="w-full my-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-3 ">Register
          to your account</button>
        <div class="text-sm font-medium text-gray-500 cursor-pointer">
          Already have an account? <a id="switchToSignin" class="text-blue-700 hover:underline ">Login
            account</a>
        </div>
      </form>
    </div>
  </div>

  <div class="page1 ">
    <div class="hero">
      <h1>Design Seamlessly with Our Wireframe Tool</h1>
      <p>Create professional wireframes quickly and efficiently with our easy-to-use editor. Perfect for designers,
        developers, and teams.</p>
    </div>
    <a href="wireframe/editor.html" class="cta-button">Start Designing</a>
    
     <svg class="editorial"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 24 150 28 "
     preserveAspectRatio="none">
   <defs>
   <path id="gentle-wave"
   d="M-160 44c30 0 
    58-18 88-18s
    58 18 88 18 
    58-18 88-18 
    58 18 88 18
    v44h-352z" />
   </defs>
   <g class="parallax1">
   <use xlink:href="#gentle-wave" x="50" y="3" fill="#f461c1"/>
   </g>
    <g class="parallax2">
   <use xlink:href="#gentle-wave" x="50" y="0" fill="#4579e2"/>
    </g>
      <g class="parallax3">
   <use xlink:href="#gentle-wave" x="50" y="9" fill="#3461c1"/>
   </g>
    <g class="parallax4">
   <use xlink:href="#gentle-wave" x="50" y="6" fill="#fff"/>  
   </g>
   </svg>
  </div>
 


  <section class="bg-gray-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div class="mr-auto place-self-center lg:col-span-7">
        <h1
          class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl bg-white:text-slate-800">
          Click to Drag and Draw</h1>
        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">To create an
          element, draw a rectangle on the canvas and then select the stencil that you want to insert. To edit the
          element, click on it. </p>

      </div>
      <div class=" lg:mt-0 lg:col-span-5 lg:flex">
        <img src="uploads/drag&drop.GIF" alt="mockup">
      </div>
      
    </div>
    
  </section>
  
  <section class="text-white body-font">
    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
        <img class="object-cover object-center rounded" alt="hero" src="uploads/palette.webp">
      </div>
      <div
        class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">A limited palette
        </h1>
        <p class="mb-8 leading-relaxed  text-gray-900">of colors and options can help you avoid wasting time on unneeded
          details, allowing you to focus on what truly matters.</p>
        <div class="flex justify-center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100"><path d="M0 100V0h1000v4L0 100z" fill="#101828"></path></svg>
        </div>
      </div>
    </div>
  </section>




  <div class="footer">
    <footer class="text-white body-font my-">
      <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a class="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <img class="w-10 h-10 text-white p-2 bg-white rounded-full" src="uploads/logo.png" alt="">
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
  <script src="assets/js/login.js"></script>
  <script src="assets/js/register.js"></script>
</body>

</html>
