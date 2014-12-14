<?php
/**
 * Created by Tim Turner (Ronin Design)
 * Date: 11:20 AM 12/6/14
 */

require_once("lib/DocInterface.class.php");
require_once("lib/MainExceptions.class.php");
require_once("lib/Object.class.php");

$target = (!empty($_POST['url']))?$_POST['url']:"http://www.google.com/intl/en/policies/terms/";
$TOS = new DocInterface($target);
$dom = $TOS->parseObjects();

$depthG = 0;
$json_out = "['#document', null, 0, 0]";
$json_ary = array();
$object_types = array();
$object_ref = array();

// Sort by object depth
$objects_by_depth = array();

// Sort by object weight
$objects_by_weight = array();

$ary = getArrayJSON($dom, "#document", $depthG);
//$ary = getArrayJSON($dom,"#document",$depthG);


/*uasort($object_ref, "obj_length");
foreach ($object_ref as $path => $obj)
{
    echo "Path: ".$path."\r\n";
    $objects_by_depth[$obj['obj']->depth][$path] = $obj;
}
arsort($objects_by_depth);
foreach($objects_by_depth as $key => $level)
{
    echo "Level: ".$key." | Count: ".count($level)."\r\n";
}*/

uasort($object_ref, "obj_weight");
foreach ($object_ref as $path => $obj)
{
    //echo "Path: ".$path."\r\n";
    $objects_by_weight[$obj['obj']->weight][$path] = $obj;
}
//arsort($objects_by_weight);
$c_obj = 0;
$pTree = array();
foreach($objects_by_weight as $key => $level)
{
    //echo "Level: ".$key." | Count: ".count($level)."\r\n";

    foreach($level as $path => $obj) {
        pTrace($path,$obj['obj']);
    }
    //print_r($level);
    //if($x++>5)
    //    die();
}
//print_r($pTree);
//print_r($object_ref);
$tJSON = array();
$GTreeJSON = "['Location', 'Parent', 'Number of Children (color)', 'Number of Children (color)']";
function buildGTreeJSON ()
{
    global $object_ref,$pTree,$tJSON,$GTreeJSON;
    foreach ($pTree as $parent => $child) {
        if (!isset($tJSON[$child])) {
            if (isset($object_ref[$child]))
                $GTreeJSON .= ",\r\n['" . $child . "', '" . $parent . "', ". $object_ref[$child]['obj']->length .", ".substr_count($child,"-")."]";
            else
                $GTreeJSON .= ",\r\n['" . $child . "', '" . $parent . "', 1, ".substr_count($child,"-")."]";
        }
        $tJSON[$child] = $parent;
        $l_parent = "";
        foreach (explode("-", $parent) as $token) {
            if (empty($l_parent))
                $l_parent = $token;
            else {


            if (!isset($tJSON[$l_parent."-".$token])) {
                $tJSON[$l_parent."-".$token] = $l_parent;
                $GTreeJSON .= ",\r\n['" . $l_parent."-".$token . "', '" . $l_parent . "', ". count($pTree[$l_parent."-".$token]) .", ".substr_count($l_parent."-".$token,"-")."]";
            }

            $l_parent .= "-".$token;
        }
        }
    }

}

buildGTreeJSON();
//print_r($GTreeJSON);
//print_r($tJSON);
/*function pTreeRec ($node)
{
    if $
}*/

$jDATA = array();
foreach($object_ref as $path => $obj) {
    //print_r($obj['obj']);
    //die();
    $jDATA[$path] = (!empty($obj['obj']->sentences))?implode(".<br>",$obj['obj']->sentences):$obj['obj']->content;
    $jDATA[substr($path,0,strrpos($path,"-"))] = (!empty($obj['obj']->sentences))?implode(".<br>",$obj['obj']->sentences):$obj['obj']->content;
}

// Takes a path
function pTrace($path,$obj)
{
    global $pTree,$tJSON;
    if (!empty($path))
    {
        $l_parent = "";
        foreach (explode("-",$path) as $parent) {
            if(empty($l_parent)) {
                $pTree[$l_parent] = $parent;
                $l_parent = $parent;
            } elseif (substr_count($l_parent,"-")+1 < substr_count($obj->path,"-")) {
                $pTree[$l_parent] = $l_parent . "-".$parent;
                $l_parent .= "-".$parent;
            } else {
                $pTree[$l_parent] = $obj->path;
                $l_parent .= "-".$parent;
            }

        }
    }
}


/*analyzeDepth($objects_by_depth);
function analyzeDepth($obj_ary)
{
    $dTree = array();
    $cTree = array();
    foreach($obj_ary as $key => $level) {
        //$l_min = 0;
        $s = array();
        while(substr_count($s['str'],"-") < 4) {
            if (empty($s)) {
                $s['str'] = strstr($path,"-",FALSE);
                $s['depth'] = 0;
            }
            //$c_cnt = $d_cnt = 0;
            foreach($level as $path => $obj) {
                if (strpos($path,$s['str']) === FALSE)
                    $dTree[$key][] = $path;
                else
                    $cTree[$key][] = $path;
            }
            $s['depth']++;
            $s['str'] = str_replace($s['str'],"",$s['str']);
        }
        foreach($level as $path => $obj)
            echo "Trunc Path: ".substr($path,0,$l_min)."\r\n";
    }
}*/

//print_r($objects_by_depth);

//uasort($object_ref, "obj_length");

/*foreach ($object_ref as $path => $obj)
{
    echo "Path: ".$path."\r\n";
    print_r($obj);
}*/
//print_r($ary);
function obj_length($a, $b)
{
    //print_r($a['obj']);
    //die();
    if ($a['obj']->length == $b['obj']->length) {
        return 0;
    }
    return ($a['obj']->length > $b['obj']->length) ? -1 : 1;
}
function obj_depth($a, $b)
{
    //print_r($a['obj']);
    //die();
    if ($a['obj']->depth == $b['obj']->depth) {
        return 0;
    }
    return ($a['obj']->depth < $b['obj']->depth) ? -1 : 1;
}
function obj_weight($a, $b)
{
    //print_r($a['obj']);
    //die();
    if ($a['obj']->weight == $b['obj']->weight) {
        return 0;
    }
    return ($a['obj']->weight > $b['obj']->weight) ? -1 : 1;
}
/*
    ['Global',    null,                 0,                               0],
    ['America',   'Global',             0,                               0],
    ['Europe',    'Global',             0,                               0],
    ['Asia',      'Global',             0,                               0],
    ['Australia', 'Global',             0,                               0],
    ['Africa',    'Global',             0,                               0],
    ['Brazil',    'America',            11,                              10],
    ['USA',       'America',            922,                              31],
*/

function getArrayJSON($node, $id = "", $depthG)
{
    global $json_out,$json_ary,$object_ref;
    $array = false;
    $width = 0;

    if ($node->hasAttributes())
    {
        foreach ($node->attributes as $attr)
        {
            $array["attr-".$attr->nodeName] = $attr->nodeValue;
        }
    }

    if ($node->hasChildNodes())
    {
        foreach ($node->childNodes as $key => $childNode)
        {
            $t_depthG = 0;
            if(!isset($json_ary[$childNode->nodeName]))
                $json_ary[$childNode->nodeName] = array();
            $i = count($json_ary[$childNode->nodeName]);
            $json_ary[$childNode->nodeName][] = $childNode->nodeName.$i;
            if ($childNode->nodeType != XML_TEXT_NODE)
                list($array[$childNode->nodeName.$i],$t_depthG) = getArrayJSON($childNode, $id."-".$childNode->nodeName.$i,$depthG);
            else {
                $array[$childNode->nodeName.$i] = array($childNode->nodeValue, "id" => $id."-".$childNode->nodeName.$i);
                if ($childNode->nodeType == XML_TEXT_NODE && strlen($childNode->nodeValue) > 0)
                    $object_ref[$id."-".$childNode->nodeName.$i] = array('obj' => new LangObject($childNode,$id."-".$childNode->nodeName.$i), 'node' => $childNode);
            }

            $array[$childNode->nodeName.$i]['id'] = $id."-".$childNode->nodeName.$i;
            //$node->setAttribute('id',$id);
            //$json_out .= ",\r\n['" . $id."-".$childNode->nodeName.$i . "', '" . $id . "', ".count($node->childNodes).", ".$depthG."]";
            $width += $t_depthG;
        }

    }
    else
    {
        if(!isset($json_ary[$node->nodeName]))
            $json_ary[$node->nodeName] = array();
        $i = count($json_ary[$node->nodeName]);
        $json_ary[$node->nodeName][] = $node->nodeName.$i;
        $array = array($node->nodeName.$i => $node->nodeValue,"id" => $id);
        if ($node->nodeType == XML_TEXT_NODE && strlen($node->nodeValue) > 0)
            $object_ref[$id."-".$node->nodeName.$i] = array('obj' => new LangObject($node,$id."-".$node->nodeName.$i), 'node' => $node);
        $width = $depthG;
    }

    return array($array,$width);
}

/* Tree partitions weighted by raw number of sub-objects
 *
 * function getArrayJSON($node, $id = "", $depthG)
{
    global $json_out,$json_ary;
    $array = false;
    $width = 0;

    if ($node->hasAttributes())
    {
        foreach ($node->attributes as $attr)
        {
            $array[$attr->nodeName] = $attr->nodeValue;
        }
    }

    if ($node->hasChildNodes())
    {
        ++$depthG;
        foreach ($node->childNodes as $key => $childNode)
        {
            $t_depthG = 0;
            if(!isset($json_ary[$childNode->nodeName]))
                $json_ary[$childNode->nodeName] = array();
            $i = count($json_ary[$childNode->nodeName]);
            $json_ary[$childNode->nodeName][] = $childNode->nodeName.$i;
            if ($childNode->nodeType != XML_TEXT_NODE)
                list($array[$childNode->nodeName.$i],$t_depthG) = getArrayJSON($childNode, $id."-".$childNode->nodeName.$i,$depthG);
            else
                $array[$childNode->nodeName.$i] = array($childNode->nodeValue, "id" => $id."-".$childNode->nodeName.$i);

            $array[$childNode->nodeName.$i]['id'] = $id."-".$childNode->nodeName.$i;
            $json_out .= ",\r\n['" . $id."-".$childNode->nodeName.$i . "', '" . $id . "', ".count($node->childNodes).", ".$depthG."]";
            $width += $t_depthG;
        }

    }
    else
    {
        if(!isset($json_ary[$node->nodeName]))
            $json_ary[$node->nodeName] = array();
        $i = count($json_ary[$node->nodeName]);
        $json_ary[$node->nodeName][] = $node->nodeName.$i;
        $array = array($node->nodeName.$i => $node->nodeValue,"id" => $id);
        $width = $depthG;
    }

    return array($array,$width);
}*/

/* RECURSIVE MODEL */
function getArray($node)
{
    $array = false;

    print_r($node);
    if ($node->hasAttributes())
    {
        foreach ($node->attributes as $attr)
        {
            $array[$attr->nodeName] = $attr->nodeValue;
        }
    }

    if ($node->hasChildNodes())
    {
        if ($node->childNodes->length == 1)
        {
            //*if ($node->firstChild->nodeValue == "FAQ")
            //    $array['children'] = $node->firstChild->nodeName;
            //if ($node->firstChild->hasChildNodes())
                //$array[$node->firstChild->nodeName] = getArray($node->firstChild);
            //else
                $array[$node->firstChild->nodeName] = $node->firstChild->nodeValue;
        }
        else
        {
            foreach ($node->childNodes as $childNode)
            {
                //if ($childNode->nodeType != XML_TEXT_NODE)
                //{
                    $array[$childNode->nodeName][] = getArray($childNode);
                //}
            }
        }
    }

    return $array;
}
//print_r($TOS->getPlainText());