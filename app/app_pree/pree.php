<!DOCTYPE html>
<html lang="en" class="js flexbox flexboxlegacy canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths ui-mobile">
 <head>

  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <link rel="apple-touch-startup-image" href="styles/splash/Default-portrait@2x~iphone5.jpg">
  <link href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=latin" rel="stylesheet">

  <!-- <link rel="stylesheet" href="build/styles.css"> -->

  <meta charset="utf-8">
  <!-- Title here -->
  <title>Pree - Home</title>
  <!-- Description, Keywords and Author -->
  <meta name="description" content="Pree Trivia game">
  <meta name="keywords" content="Pree Trivia Game">
  <meta name="author" content="Orinoco Inc.">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Styles -->
  <!-- Bootstrap CSS -->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- jQuery UI -->
  <link rel="stylesheet" href="vendor/styles/jquery-ui.css">
  <!-- jQuery Gritter -->
  <link rel="stylesheet" href="vendor/styles/jquery.gritter.css">
  <!-- Font awesome CSS -->
  <link href="vendor/styles/font-awesome.min.css" rel="stylesheet">

  <!-- Widgets stylesheet -->
  <link href="vendor/styles/widgets.css" rel="stylesheet">
  <!-- Custom CSS -->
  <link href="build/styles.css" rel="stylesheet">
  <!-- Favicon -->
  <link rel="apple-touch-icon" sizes="57x57" href="img/favicon/apple-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="img/favicon/apple-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="img/favicon/apple-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="img/favicon/apple-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="img/favicon/apple-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="img/favicon/apple-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="img/favicon/apple-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-icon-180x180.png">
  <link rel="icon" type="image/png" sizes="192x192"  href="img/favicon/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="img/favicon/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
  <link rel="manifest" href="img/favicon/manifest.json">
 </head>

 <body>

  <div class="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
   <div class="container">
    <!-- Menu button for smallar screens -->
    <div class="navbar-header">
     <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
     </button>
     <a href="index.php" class="navbar-brand"><img width=150 src="img/pree.png"></a>
    </div>
    <!-- Site name for smallar screens -->
    <!-- Navigation starts -->
    <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
     <!-- Links -->
     <ul class="nav navbar-nav navbar-right">
      <li class="dropdown">
       <a data-toggle="dropdown" class="dropdown-toggle" href="#"> <img src="img/user.jpg" alt="" class="nav-user-pic img-responsive" /> Admin <b class="caret"></b> </a>
       <!-- Dropdown menu -->
       <ul class="dropdown-menu">
        <li>
         <a href="#"><i class="fa fa-user"></i> Profile</a>
        </li>
        <li>
         <a href="#"><i class="fa fa-cogs"></i> Settings</a>
        </li>
        <li>
         <a href="login.html"><i class="fa fa-power-off"></i> Logout</a>
        </li>
       </ul>
      </li>
     </ul>
     <!-- Notifications -->
     <ul class="nav navbar-nav navbar-right">
      <!-- Comment button with number of latest comments count -->
      <li class="dropdown dropdown-big">
       <a class="dropdown-toggle" href="#" data-toggle="dropdown"> <i class="fa fa-comments"></i> Chats <span   class="badge badge-info">6</span> </a>
       <ul class="dropdown-menu">
        <li>
         <!-- Heading - h5 -->
         <h5><i class="fa fa-comments"></i> Chats</h5>
         <!-- Use hr tag to add border -->
         <hr />
        </li>
        <li>
         <!-- List item heading h6 -->
         <a href="#">Hi :)</a><span class="label label-warning pull-right">10:42</span>
         <div class="clearfix"></div>
         <hr />
        </li>
        <li>
         <a href="#">How are you?</a><span class="label label-warning pull-right">20:42</span>
         <div class="clearfix"></div>
         <hr />
        </li>
        <li>
         <a href="#">What are you doing?</a><span class="label label-warning pull-right">14:42</span>
         <div class="clearfix"></div>
         <hr />
        </li>
        <li>
         <div class="drop-foot">
          <a href="#">View All</a>
         </div>
        </li>
       </ul>
      </li>
      <!-- Message button with number of latest messages count-->
      <li class="dropdown dropdown-big">
       <a class="dropdown-toggle" href="#" data-toggle="dropdown"> <i class="fa fa-envelope-o"></i> Inbox <span class="badge badge-important">6</span> </a>
       <ul class="dropdown-menu">
        <li>
         <!-- Heading - h5 -->
         <h5><i class="fa fa-envelope-o"></i> Messages</h5>
         <!-- Use hr tag to add border -->
         <hr />
        </li>
        <li>
         <!-- List item heading h6 -->
         <a href="#">Hello how are you?</a>
         <!-- List item para -->
         <p>
          Quisque eu consectetur erat eget  semper...
         </p>
         <hr />
        </li>
        <li>
         <a href="#">Today is wonderful?</a>
         <p>
          Quisque eu consectetur erat eget  semper...
         </p>
         <hr />
        </li>
        <li>
         <div class="drop-foot">
          <a href="#">View All</a>
         </div>
        </li>
       </ul>
      </li>
      <!-- Members button with number of latest members count -->
      <li class="dropdown dropdown-big">
       <a class="dropdown-toggle" href="#" data-toggle="dropdown"> <i class="fa fa-user"></i> Users <span   class="badge badge-success">6</span> </a>
       <ul class="dropdown-menu">
        <li>
         <!-- Heading - h5 -->
         <h5><i class="fa fa-user"></i> Users</h5>
         <!-- Use hr tag to add border -->
         <hr />
        </li>
        <li>
         <!-- List item heading h6-->
         <a href="#">Ravi Kumar</a><span class="label label-warning pull-right">Free</span>
         <div class="clearfix"></div>
         <hr />
        </li>
        <li>
         <a href="#">Balaji</a><span class="label label-important pull-right">Premium</span>
         <div class="clearfix"></div>
         <hr />
        </li>
        <li>
         <a href="#">Kumarasamy</a><span class="label label-warning pull-right">Free</span>
         <div class="clearfix"></div>
         <hr />
        </li>
        <li>
         <div class="drop-foot">
          <a href="#">View All</a>
         </div>
        </li>
       </ul>
      </li>
     </ul>
    </nav>
   </div>
  </div>

  <!-- Main content starts -->
  <div class="content">
   <!-- Sidebar -->
   <div class="sidebar">
    <div class="sidebar-dropdown">
     <a href="#">Navigation</a>
    </div>
    <div class="sidebar-inner">
     <!-- Search form -->
     <div class="sidebar-widget">
      <!--	<form >
      <input type="text" class="form-control" placeholder="Search">
      </form> -->
      <div ><img width=100% height=40 src="img/singlepixel.png">
      </div>
     </div>
     <!--- Sidebar navigation -->
     <!-- If the main navigation has sub navigation, then add the class "has_submenu" to "li" of main navigation. -->
     <ul class="navi">
      <!-- Use the class nred, ngreen, nblue, nlightblue, nviolet or norange to add background color. You need to use this in <li> tag. -->

      <li class="nred current">
       <a href="#"><i class="fa fa-desktop"></i> Dashboard</a>
      </li>
      <!-- Menu with sub menu -->
      <li class="has_submenu nlightblue">
       <a href="#"> <!-- Menu name with icon --> <i class="fa fa-th"></i> Widgets <!-- Icon for dropdown --> <span class="pull-right"><i class="fa fa-angle-right"></i></span> </a>
       <ul>
        <li>
         <a href="widgets1.html">Widgets #1</a>
        </li>
        <li>
         <a href="widgets2.html">Widgets #2</a>
        </li>
       </ul>
      </li>
      <li class="ngreen">
       <a href="charts.html"><i class="fa fa-bar-chart-o"></i> Charts</a>
      </li>
      <li class="norange">
       <a href="ui.html"><i class="fa fa-sitemap"></i> UI Elements</a>
      </li>
      <li class="has_submenu nviolet">
       <a href="#"> <i class="fa fa-file-o"></i> Pages #1 <span class="pull-right"><i class="fa fa-angle-right"></i></span> </a>
       <ul>
        <li>
         <a href="calendar.html">Calendar</a>
        </li>
        <li>
         <a href="post.html">Make Post</a>
        </li>
        <li>
         <a href="login.html">Login</a>
        </li>
        <li>
         <a href="register.html">Register</a>
        </li>
        <li>
         <a href="statement.html">Statement</a>
        </li>
        <li>
         <a href="error-log.html">Error Log</a>
        </li>
        <li>
         <a href="support.html">Support</a>
        </li>
       </ul>
      </li>
      <li class="has_submenu nblue">
       <a href="#"> <i class="fa fa-file-o"></i> Pages #2 <span class="pull-right"><i class="fa fa-angle-right"></i></span> </a>
       <ul>
        <li>
         <a href="error.html">Error</a>
        </li>
        <li>
         <a href="gallery.html">Gallery</a>
        </li>
        <li>
         <a href="grid.html">Grid</a>
        </li>
        <li>
         <a href="invoice.html">Invoice</a>
        </li>
        <li>
         <a href="media.html">Media</a>
        </li>
        <li>
         <a href="profile.html">Profile</a>
        </li>
       </ul>
      </li>
      <li class="nred">
       <a href="forms.html"><i class="fa fa-list"></i> Forms</a>
      </li>
      <li class="nlightblue">
       <a href="tables.html"><i class="fa fa-table"></i> Tables</a>
      </li>
     </ul>
     <!--/ Sidebar navigation -->

     <!-- Date -->
     <div class="sidebar-widget">
      <div id="todaydate"></div>
     </div>
    </div>
   </div>
   <!-- Sidebar ends -->

   <!-- Main bar -->
   <div class="mainbar">

    <!-- Page heading -->
    <div class="page-head">
     <!-- Page heading -->
     <h2 class="pull-left"><div id="app-content"></div><!-- page meta --><span class="page-meta"> </span></h2>
     <!-- Breadcrumb -->
     <div class="bread-crumb pull-right">
      <a href="#"><i class="fa fa-home"></i> Home</a>
      <!-- Divider -->
      <span class="divider">/</span>
      <a href="#" class="bread-current">Dashboard</a>
     </div>
     <div class="clearfix"></div>
    </div><!--/ Page heading ends -->
    <!-- Matter -->
    <div class="matter">
     <div class="container">
      <div class="row" >
       <div id="pree_feed_tabs" class="col-md-6">
        <ul id="pree_feed_tabs_items">
         <li filterType="TRENDING">
          <a   href="#trending">Trending</a>
         </li>
         <li filterType="FOLLOWING">
          <a   href="#following">Following</a>
         </li>
         <li filterType="CATEGORIES">
          <a  href="#categories">Categories</a>
         </li>
        </ul>

       </div>
      </div>
      <div class="row" >
       <div id="pree_feed" class="col-md-6">
        <ul class="pree_feed_questions"></ul>
        <!-- <img  width=100% src="img/preefeed.png"> -->
       </div>
      </div>

     </div>
    </div><!--/ Matter ends -->
   </div><!--/ Mainbar ends -->
   <div class="clearfix"></div>
  </div><!--/ Content ends -->

  <!-- Notification box starts -->
  <div class="slide-box" style="display:none;">
   <!-- Notification box head -->
   <div class="slide-box-head bred">
    <!-- Title -->
    <div class="pull-left">
     Notification Box
    </div>
    <!-- Icon -->
    <div class="slide-icons pull-right">
     <a href="#" class="sminimize"><i class="fa fa-chevron-down"></i></a>
     <a href="#" class="sclose"><i class="fa fa-times"></i></a>
    </div>
    <div class="clearfix"></div>
   </div>

   <div class="slide-content">

    <!-- It is default bootstrap nav tabs. See official bootstrap doc for doubts -->
    <ul class="nav nav-tabs">
     <!-- Tab links -->
     <li class="active">
      <a href="#tab1" data-toggle="tab"><i class="fa fa-file-o"></i></a>
     </li>
     <li>
      <a href="#tab2" data-toggle="tab"><i class="fa fa-phone"></i></a>
     </li>
     <li>
      <a href="#tab3" data-toggle="tab"><i class="fa fa-comments"></i></a>
     </li>
    </ul>

    <!-- Tab content -->

    <div class="tab-content">

     <div class="tab-pane active" id="tab1">

      <!-- Earning item -->
      <div class="slide-data">
       <div class="slide-data-text">
        Today Earnings
       </div>
       <div class="slide-data-result">
        $50,000 <i class="fa fa-arrow-up red"></i>
       </div>
       <div class="clearfix"></div>
      </div>

      <!-- Earning item -->
      <div class="slide-data">
       <div class="slide-data-text">
        Yesterday Earnings
       </div>
       <div class="slide-data-result">
        $46,000 <i class="fa fa-arrow-down green"></i>
       </div>
       <div class="clearfix"></div>
      </div>

      <!-- Earning item -->
      <div class="slide-data">
       <div class="slide-data-text">
        Weeks Earnings
       </div>
       <div class="slide-data-result">
        $43,000 <i class="fa fa-arrow-up red"></i>
       </div>
       <div class="clearfix"></div>
      </div>

      <!-- Earning item -->
      <div class="slide-data">
       <div class="slide-data-text">
        Months Earnings
       </div>
       <div class="slide-data-result">
        $32,000 <i class="fa fa-arrow-down green"></i>
       </div>
       <div class="clearfix"></div>
      </div>

      <!-- Earning item -->
      <div class="slide-data">
       <div class="slide-data-text">
        Years Earnings
       </div>
       <div class="slide-data-result">
        $15,000 <i class="fa fa-arrow-up red"></i>
       </div>
       <div class="clearfix"></div>
      </div>

     </div>

     <div class="tab-pane" id="tab2">
      <h5>Have some content here.</h5>
      <p>
       Aliquam dui libero, pharetra nec venenatis in, scelerisque quis odio. In hac habitasse platea dictumst. Etiam porta placerat turpis, eget fermentum neque egestas at. Vestibulum ullamcorper, augue a sollicitudin vestibulum, orci purus semper felis, lobortis consequat nisi nunc eu enim.
      </p>
     </div>

     <div class="tab-pane" id="tab3">
      <h5>Have some content here.</h5>
      <p>
       Aliquam dui libero, pharetra nec venenatis in, scelerisque quis odio. In hac habitasse platea dictumst. Etiam porta placerat turpis, eget fermentum neque egestas at. Vestibulum ullamcorper, augue a sollicitudin vestibulum, orci purus semper felis, lobortis consequat nisi nunc eu enim.
      </p>
     </div>

    </div>

   </div>

   <!-- Notification box ends -->

   <!-- Scroll to top -->
   <span class="totop"><a href="#"><i class="fa fa-chevron-up"></i></a></span>

   <!-- Javascript files -->
   <!-- jQuery -->
   <script src="vendor/scripts/jquery.js"></script>
   <!-- Bootstrap JS -->
   <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
   <!-- jQuery UI -->
   <script src="vendor/scripts/jquery-ui.min.js"></script>
   <!-- jQuery Flot -->
   <script src="vendor/scripts/excanvas.min.js"></script>
   <script src="vendor/scripts/jquery.flot.js"></script>
   <script src="vendor/scripts/jquery.flot.resize.js"></script>
   <script src="vendor/scripts/jquery.flot.pie.js"></script>
   <script src="vendor/scripts/jquery.flot.stack.js"></script>
   <!-- Sparklines -->
   <script src="vendor/scripts/sparklines.js"></script>
   <!-- jQuery Gritter -->
   <script src="vendor/scripts/jquery.gritter.min.js"></script>
   <!-- Respond JS for IE8 -->
   <script src="vendor/scripts/respond.min.js"></script>
   <!-- HTML5 Support for IE -->
   <script src="vendor/scripts/html5shiv.js"></script>

   <!-- Script for this page -->
   <script src="vendor/scripts/sparkline-index.js"></script>
   <!-- Custom JS -->
   <script src="scripts/custom.js"></script>

   <script src="build/bundle.js"></script>

 </body>
</html>
