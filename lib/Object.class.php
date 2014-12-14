<?php
/**
 * Created by Tim Turner (Ronin Design)
 * Date: 4:27 PM 12/7/14
 */

class Object
{
    public $path;
    public $weight;
    public $depth;
    public $siblings;
    public $children;
    public $parentNode;

}

class LangObject extends Object
{
    public $path;
    public $content;
    public $length;
    public $words;
    public $c_words;
    public $sentences;
    public $c_sentences;

    function __construct($node,$path = "")
    {
        $this->content = $node->nodeValue;
        $this->path = $path;
        $this->length = strlen($node->nodeValue);
        $this->depth = substr_count($path,"-");
        $this->weight = $this->depth*$this->length;
        if (strpos($node->nodeValue,".") !== false) {
            $this->sentences = explode(".", $node->nodeValue);
            $this->c_sentences = count($this->sentences);
        }
        if (strpos($node->nodeValue," ") !== false) {
            $this->words = explode(" ", $node->nodeValue);
            $this->c_words = count($this->words);
        }
    }

}

class Word extends LangObject
{
    public $length;
    public $type;
    public $prefix;
    public $postfix;
    //public $complex;
    // Options: {lower, upper, ufirst}
    // Note: might replace with "upper_count"
    public $case = "lower";
}

class Sentence extends Word
{
    public $word_count;
}

class Paragraph extends Sentence
{
    public $sentence_count;
}

class Title extends Sentence
{

}

class Section extends Paragraph
{

}