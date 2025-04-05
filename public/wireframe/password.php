<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile </title>
    <link href="../assets/css/tailwindstyles.css" rel="stylesheet">
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
                <a href="/" class="text-white">Logout</a>
            </nav>
        </div>
    </header>
    <div class="container mx-auto p-6">
        <h4 class="text-xl font-bold mb-4">Account Settings</h4>
        <div class="bg-white shadow-md rounded-lg p-6 md:flex md:space-x-6">
            <div class="md:w-1/4 w-full border-b-gray-500 md:border-b-0  pb-4 md:pb-0">
                <div class="space-y-4">
                    <a class="block p-2  hover:bg-gray-200 rounded-md" href="setting.php">General</a>
                    <a class="block p-2 bg-blue-500 text-white  rounded-md" href="password.php">Change Password</a>
                    <a class="block p-2 hover:bg-gray-200 rounded-md" href="draft.php">Draft</a>
                </div>
            </div>
            <div class="md:w-3/4 w-full p-6">
                <div id="account-general">
                  
                    <hr class="border-none my-4">
                    <div class="space-y-4">
                        <form >

                            <div>
                                <label class="block text-gray-700">Current Password</label>
                                <input type="password" class="w-full p-2 border rounded-md" >
                        </div>
                        <div>
                            <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Forget
                                Password?</a>
                        </div>
                        <div>
                            <label class="block text-gray-700">New Password</label>
                            <input type="password" class="w-full p-2 border rounded-md" >
                        </div>
                        <div>
                            <label class="block text-gray-700">Repeat Password</label>
                            <input type="password" class="w-full p-2 border rounded-md" >
                        <div>
                            <button type="submit"
                            class="w-full my-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer ">Save Change</button>
                        </div>
                       
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../assets/js/setting.js"></script>
</body>
</html>
