<?php
/**
 * Created by Tim Turner (Ronin Design)
 * Date: 8:03 AM 12/6/14
 * Project: LAWvious
 */

class DocInterface
{
    // General Properties
    protected $raw;


    /**
     * Request the TOS content from its original source.
     *
     * @param $target
     * @param string $type
     */
    function __construct($target, $type = "url")
    {
        switch($type){
            case "url":
                $error = filter_var($target, FILTER_VALIDATE_URL);
                try {
                    $raw = file_get_contents($target);
                    if ($raw === FALSE) {
                        throw new MainException("Target URL returned FALSE. Unable to access content.");
                    } else {
                        $this->raw = $raw;
                    }

                } catch (MainException $e) {
                    die("[ERROR]: ".$e->getMessage());
                }

                break;
        }

    }

    public function parseObjects()
    {
        /* Main / General Case (HTML) - Raw content is a web page or other "tag"ful format. */
        $dom = new DOMDocument;
        $dom->preserveWhiteSpace = FALSE;
        $dom->loadHTML($this->raw);
        $dom->normalizeDocument();
        return $dom;
    }

    public function getVisual($cat = "objects", $type = "basic")
    {
        if ($cat == "objects") {
            switch($type) {
                case "basic":
                    break;
                case "tree":

                    break;
            }
        }
    }

    public function getRaw()
    {
        return $this->raw;
    }

}