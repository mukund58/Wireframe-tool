<?php 
session_start();
include "../php/config.php";
$username = $_SESSION["username"];
if (!isset($_SESSION['loggedin'])) {
    header("location:/index.php");
    exit();
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile </title>
    <link href="../assets/css/tailwindstyles.css" rel="stylesheet">
    <link rel="icon" type="image/png" href="../uploads/white-logo.png"  >
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.5.0/fabric.min.js"></script>
    <link rel="stylesheet" href="../assets/css/utilities.css">
        <link rel="stylesheet" href="../assets/css/dashboard.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
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
        <div class="bg-white shadow-md rounded-lg p-6 md:flex md:space-x-6">
            <div class="md:w-1/4 w-full border-b-gray-500 md:border-b-0  pb-4 md:pb-0">
                <div class="space-y-4">
                    <a class="block p-2 hover:bg-gray-200  rounded-md" href="setting.php">General</a>
                    <a class="block p-2 hover:bg-gray-200 rounded-md" href="password.php">Change Password</a>
                    <a class="block p-2 bg-blue-500 text-white rounded-md" href="#account-info">Draft</a>
                </div>
            </div>
            <div class=" md:w-3/4 w-full ">
                <div id="account-general">
                  
                    
                    
                        <div class="dashboard-content ">
                            <h2>Saved Drafts</h2>
                            <form action="" method="get">
                            <div class="my-5">
                                    <input type="text" id="draft-title" placeholder="Enter draft title" class="w-full p-2 border rounded-md" />
                                    <button id="create-draft-btn" class="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded-md">Create Draft</button>
                              </div>
                              </form>
                            <div class="drafts-container">
                            <?php
                                $uid = $_SESSION['user_id'];
                                $result = $conn->query("SELECT * FROM drafts WHERE user_id = $uid ORDER BY created_at DESC");
                                while ($row = $result->fetch_assoc()) {
                                    echo '<div class="draft border rounded p-4 my-2">';
                                    echo '<h3 class="font-bold text-lg">' . htmlspecialchars($row['title']) . '</h3>';
                                    echo '<div class="actions mt-2">';
                                    echo '<a href="../wireframe/editor.php?draft_id=' . $row['id'] . '" class="edit-draft text-blue-600">Edit</a> | ';
                                    echo '<a href="../php/delete_draft.php?id=' . $row['id'] . '" class="text-red-600" onclick="return confirm(\'Delete this draft?\')">Delete</a>';
                                    echo '</div></div>';
                                }
                                ?>

                                <!-- Drafts will be dynamically loaded here -->
                            </div>
                        

                            <div class="export-import-buttons">
                                <button id="export-drafts-btn" class="w-full my-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">Export Drafts as JSON</button>
                                <button id="import-drafts-btn"class="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer" >Import Drafts from JSON</button>
                                <input type="file" id="import-drafts-input" accept="application/json" style="display: none;">
                            </div>
                        </div>
                   
                </div>
            </div>
        </div>
    </div>
    <!-- <script src="../assets/js/setting.js"></script> -->
    <!-- <script src="../assets/js/dashboard.js"></script> -->
    <script src="../assets/js/script.js" defer></script>
    <script src="../assets/js/draft.js" defer></script>

</body>
</html>
