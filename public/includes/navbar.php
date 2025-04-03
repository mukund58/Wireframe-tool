<?php 
session_start();

$email = $login_err_msg = "";
if (!empty($_SESSION['login_err_msg'])) {
  $login_err_msg = $_SESSION['login_err_msg'];
  $email = $_SESSION['email'];
  unset($_SESSION['login_err_msg'], $_SESSION['email']); // Clear session error messages
}
?>
<header class="sticky-header">
  <div class="navigation">
    <div class="logo">
      <h1><a href="/index.html"><img src="/uploads/logo.png" width="50px" height="50px" alt="Logo"></a></h1>
    </div>
    <div class="menubar">
      <input type="checkbox" id="hamburger-checkbox" style="display: none;">
      <label for="hamburger-checkbox">
        <h1><i class='menu-icon bx bx-menu-alt-right text-5xl'></i></h1>
      </label>

      <nav class="nav-user">
        <label for="hamburger-checkbox">
          <img class="close-icon" src="/uploads/close-icon.svg" alt="close-icon">
        </label>
        <a href="/wireframe/setting.php">Profile</a>
        <a href="/wireframe/dashboard.html">Dashboard</a>
        <a href="/wireframe/contact.html">Contact Sales</a>

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
