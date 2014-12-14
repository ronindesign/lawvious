<?php
/**
 * Created by Tim Turner (Ronin Design)
 * Date: 8:03 AM 12/6/14
 * Project: LAWvious
 */

require_once("inc.php");
?>

<br />
<br />
<html>
<head>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
        google.load("visualization", "1", {packages:["treemap"]});
        google.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable([

                <?php echo $GTreeJSON; ?>
                /*['Location', 'Parent', 'Number of Children (color)', 'Number of Children (color)'],


                ['Global',    null,                 0,                               0],
                ['America',   'Global',             0,                               0],
                ['Europe',    'Global',             0,                               0],
                ['Asia',      'Global',             0,                               0],
                ['Australia', 'Global',             0,                               0],
                ['Africa',    'Global',             0,                               0],
                ['Brazil',    'America',            11,                              10],
                ['USA',       'America',            922,                              31],
                ['Mexico',    'America',            24,                              12],
                ['Canada',    'America',            16,                              -23],
                ['France',    'Europe',             42,                              -11],
                ['Germany',   'Europe',             31,                              -2],
                ['Sweden',    'Europe',             22,                              -13],
                ['Italy',     'Europe',             17,                              4],
                ['UK',        'Europe',             21,                              -5],
                ['China',     'Asia',               36,                              4],
                ['Japan',     'Asia',               20,                              -12],
                ['India',     'Asia',               40,                              63],
                ['Laos',      'Asia',               4,                               34],
                ['Mongolia',  'Asia',               1,                               -5],
                ['Israel',    'Asia',               12,                              24],
                ['Iran',      'Asia',               18,                              13],
                ['Pakistan',  'Asia',               11,                              -52],
                ['Egypt',     'Africa',             21,                              0],
                ['S. Africa', 'Africa',             30,                              43],
                ['Sudan',     'Africa',             12,                              2],
                ['Congo',     'Africa',             10,                              12],
                ['Zaire',     'Africa',             8,                               10]*/
            ]);

            tree = new google.visualization.TreeMap(document.getElementById('chart_div'));

            tree.draw(data, {
                minColor: '#ddd',
                midColor: '#7d7',
                maxColor: '#0d0',
                headerHeight: 15,
                fontColor: 'black',
                showScale: true,
                generateTooltip: showFullTooltip
            });
            function showFullTooltip(row, size, value) {
                var jData = <?php echo json_encode($jDATA); ?>;
                if (typeof jData[data.getValue(row, 0)] != 'undefined')
                    return '<div style="background:#fd9; padding:10px; border-style:solid"><span style="font-family:Courier">'+jData[data.getValue(row, 0)]+'</div>';
                else
                    return '<div style="background:#fd9; padding:10px; border-style:solid"><span style="font-family:Courier">'+data.getValue(row, 0)+'</div>';
            }

        }
    </script>
</head>
<body>
<form method="post">
    <label>Enter URL for a Terms of Service, End-User License Agreement, or other legal web page.</label><br />
    <input name="url" type="text" style="width: 500px" /><br/>
    <input type="submit">
</form>
<div id="chart_div" style="width: 900px; height: 500px;"></div>
</body>
</html>