<?php
namespace aperturescience\i18n;

//use aperturescience\exception\GoolgeTranslateException;

/**
 * This class implements wrapper around Google Translate API
 *
 * @author Cyril Ogana <cogana@gmail.com>
 */
class GoogleTranslate
{
    private static $_apiKey = null;

    /**
    * Set the Goolge web service API key
    * 
    * @param string apiKey - The GoogleTranslate service API Key
    */
    public static function initService($apiKey) {
        //curl extension must be loaded?
        if (!extension_loaded('curl')) {
            //throw new GoogleTranslateException('Curl extension not loaded!', 8001);
            throw new \Exception('Curl extension not loaded!', 8001);            
        }

        //utf8 necessary for i18n
        ini_set('default_charset', 'UTF-8');

        //set the api service key
        self::$_apiKey = (string) $apiKey;
    }

    /**
     * Fetch a  list of supported languages
     *
     * @return array
     */
    public static function fetchLanguages($target = 'en', $fields = 'languages') {
        $apiKey = self::$_apiKey;

        //build request url
        $serviceUrl = 'https://www.googleapis.com/language/translate/v2/languages?key=' . $apiKey
            . '&target='. $target
            . '&fields=' . $fields;
        
        $serviceResponse = self::_handleRequest($serviceUrl);

        $serviceResponseCode   = $serviceResponse['code'];
        $serviceResponseResult = $serviceResponse['result'];
        $serviceResponseResultDecoded = json_decode(utf8_encode($serviceResponseResult), true);
        
        if ($serviceResponseCode != 200) {
            $serviceResponseResultError = $serviceResponseResultDecoded['error']['errors'][0]['message'];
            //throw new GoogleTranslateException($serviceREsponseResultError, 8002);
            throw new \Exception($serviceResponseResultError, 8002);            
        }
        
        return $serviceResponseResultDecoded;
    }
    
    /**
     * Detect a language in one string or multiple languages in
     * several strings
     * 
     * @param array $originalStrings - Array of one or more phrases or words ot detectLanguages
     * 
     * 
     * @return void
     */
    public static function detectLanguages($originalStrings) {
        //we really insist on an array. didn't type hint so that we allow exception
        if (!is_array($originalStrings)) {
            //throw new GoogleTranslateException('Language detection parameter 1 (originalStrings) expects an array');
            throw new \Exception('Language detection parameter 1 (originalStrings) expects an array');
        }
        
        //start building the request URI
        $apiKey = self::$_apiKey;
        $fields = 'detections';
        $serviceUrl = 'https://www.googleapis.com/language/translate/v2/detect?&key=' . $apiKey
            . '&fields=' . $fields;
        
        
        //buile our request URI
        foreach ($originalStrings as $textPhrase) {
            $textPhraseCast = (string) $textPhrase;
            $serviceUrl .= '&q=' . rawurlencode($textPhraseCast);
        }
        
        //impose max length on request url
        if (iconv_strlen($serviceUrl) >= 2000) {
            //throw new GoogleTranslateException('URI resulting from requested strings for language detection too long', 8003);
            throw new \Exception('URI resulting from requested strings for language detection too long', 8003);
        }
        
        $serviceResponse = self::_handleRequest($serviceUrl);

        $serviceResponseCode   = $serviceResponse['code'];
        $serviceResponseResult = $serviceResponse['result'];
        $serviceResponseResultDecoded = json_decode(utf8_encode($serviceResponseResult), true);
        
        if ($serviceResponseCode != 200) {
            $serviceResponseResultError = $serviceResponseResultDecoded['error']['errors'][0]['message'];
            //throw new GoogleTranslateException($serviceREsponseResultError, 8002);
            throw new \Exception($serviceResponseResultError, 8002);            
        }
        
        return $serviceResponseResultDecoded;    
        
    }
    
    /**
     * Translate a text string or set of $originalStrings
     * 
     * @param array $originalStrings - words/phrase to translate
     * @param string $sourceLang - the source Language
     * @param string $targetLang - the target Language
     * @param string $fields     - fields to include in return response
     * 
     * @return array
     */
    public static function translateLanguages(
        $originalString,
        $sourceLang,
        $targetLang,
        $fields = 'translations'
    ) {
        //we really insist on an array. didn't type hint so that we allow exception
        /*if (!is_array($originalStrings)) {
            //throw new GoogleTranslateException('Language detection parameter 1 (originalStrings) expects an array');
            throw new \Exception('Language detection parameter 1 (originalStrings) expects an array');
        }*/
        
        //start building the request URI
        $apiKey = self::$_apiKey;        
        $originalStringCast = (string) $originalString;
        $sourceLangCast = (string) $sourceLang;
        $targetLangCast = (string) $targetLang;
        
        $serviceUrlInit = 'https://www.googleapis.com/language/translate/v2?key=' . $apiKey
        . '&fields=' . $fields
        . '&source=' . $sourceLangCast
        . '&target=' . $targetLangCast;
        
        $textSplit = self::_strSplitUnicode($originalStringCast, 1000);
        $countNodes = count($textSplit);
        $loopCounter = 0;
        $serviceResultFull = '';
        
        while ($loopCounter < $countNodes) {
            $textItem = $textSplit[$loopCounter];
            $serviceUrl = $serviceUrlInit . '&q=' . rawurlencode($textItem);
            //die($serviceUrl);
            $serviceResponse = self::_handleRequest($serviceUrl);

            $serviceResponseCode   = $serviceResponse['code'];
            $serviceResponseResult = $serviceResponse['result'];
            $serviceResponseResultDecoded = json_decode(utf8_encode($serviceResponseResult), true);
            
            if ($serviceResponseCode != 200) {
                $serviceResponseResultError = $serviceResponseResultDecoded['error']['errors'][0]['message'];
                //throw new GoogleTranslateException($serviceREsponseResultError, 8002);
                throw new \Exception($serviceResponseResultError, 8002);            
            }
            
            $serviceResultFull .= $serviceResponseResultDecoded['data']['translations'][0]['translatedText']; 
            
            ++$loopCounter;
        }
        
        return $serviceResultFull;
        
        /*//buile our request URI
        foreach ($originalStrings as $textPhrase) {
            $textPhraseCast = (string) $textPhrase;
            $serviceUrl .= '&q=' . rawurlencode($textPhraseCast);
        }
        
        //impose max length on request url
        if (strlen($serviceUrl) >= 5000) {
            //throw new GoogleTranslateException('URI resulting from requested strings for language detection too long', 8003);
            throw new \Exception('URI resulting from requested strings for language detection too long', 8003);
        }*/
    }
    

    /**
     * Handle a http request and return the results 
     *
     * @param string $requestUri  - The requested http resource 
     *
     * @return  array
     */
    protected static function _handleRequest($requestUri) {
        $requestHandle = curl_init($requestUri);

        curl_setopt($requestHandle, CURLOPT_RETURNTRANSFER, true);
        $responseResult = curl_exec($requestHandle);

        $responseCode = curl_getinfo($requestHandle, CURLINFO_HTTP_CODE);
        
        $requestPayload = array (
            'code'   => $responseCode,
            'result' => $responseResult
        );

        return $requestPayload;
    }
    
    /**
     * Unicode String-Split
     * 
     * @param string $utfString - The string to String-Split
     * @param int    $splitCount - The number of array elements needed inoutput
     * 
     * @return array
     */
    protected static function _strSplitUnicode($utfString, $splitCount = 0) {
        if ($splitCount > 0) {
            $retArr = array();
            $strLen = mb_strlen($utfString, "UTF-8");
            for ($iCounter = 0; $iCounter < $strLen; $iCounter += $splitCount) {
                $retArr[] = mb_substr($utfString, $iCounter, $splitCount, "UTF-8");
            }
            return $retArr;
        }
        return preg_split("//u", $utfString, -1, PREG_SPLIT_NO_EMPTY);
    }
}

ini_set('error_reporting',1);                                                                                          
ini_set('display_errors','On'); 
$apiKey = 'AIzaSyBBydMTz2PuMecVPd3MeMUxY84s52PvUKs'; 
GoogleTranslate::initService($apiKey);
$languages = GoogleTranslate::fetchLanguages('sw');
//print_r(array('Jina langu ni Ogana', 'My name is Ogana', 'dasvidanha', 'il mio nome e giacomo'));
//(print_r($languages));
///echo '<h6>Original Strings</h6>';
echo '<h4>GoogleTranslate::detectLanguages(array(\'Jina langu ni Ogana\', \'Welcome to aperturescience\', \'Spaseeba preekrasna\', \'il mio nome e giacomo\'))</h4>';
$detections = GoogleTranslate::detectLanguages(array('Jina langu ni Ogana', 'Welcome to aperturescience', 'Spaseeba preekrasna', 'il mio nome e giacomo'));
print_r($detections);
echo '
<h4>
GoogleTranslate::translateLanguages(
    "(ج) يمكن لـ CNNArabic.COM تقديم مواضيع مثل الصحة واللياقة البدنية والغذائية وأية معلومات أخرى، ولكن تهدف هذه المعلومات لأغراض تعليمية وإعلامية فقط. حيث أن المعلومات الواردة في CNNArabic.COM لا يقصد بها نقل نصائح طبية. ينبغي عليك عدم الاعتماد على هذه المعلومات كبديل لك، ولا تحل محل، طلب الاستشارة الطبية المتخصصة، التشخيص أو العلاج. الشركة ليست مسؤولة عن أي عمل أو امتناع عن فعل من جانبه على المستخدم استنادا إلى المعلومات التي ترد في CNNArabic.COM.",
    ,"ar",
    ,"en"
);</h4>';

$translations = GoogleTranslate::translateLanguages(
        "(ج) يمكن لـ CNNArabic.COM تقديم مواضيع مثل الصحة واللياقة البدنية والغذائية وأية معلومات أخرى، ولكن تهدف هذه المعلومات لأغراض تعليمية وإعلامية فقط. حيث أن المعلومات الواردة في CNNArabic.COM لا يقصد بها نقل نصائح طبية. ينبغي عليك عدم الاعتماد على هذه المعلومات كبديل لك، ولا تحل محل، طلب الاستشارة الطبية المتخصصة، التشخيص أو العلاج. الشركة ليست مسؤولة عن أي عمل أو امتناع عن فعل من جانبه على المستخدم استنادا إلى المعلومات التي ترد في CNNArabic.COM.",
    
    'ar',
    'en'
);

echo $translations;
echo sha1("(ج) يمكن لـ CNNArabic.COM تقديم مواضيع مثل الصحة واللياقة البدنية والغذائية وأية معلومات أخرى، ولكن تهدف هذه المعلومات لأغراض تعليمية وإعلامية فقط. حيث أن المعلومات الواردة في CNNArabic.COM لا يقصد بها نقل نصائح طبية. ينبغي عليك عدم الاعتماد على هذه المعلومات كبديل لك، ولا تحل محل، طلب الاستشارة الطبية المتخصصة، التشخيص أو العلاج. الشركة ليست مسؤولة عن أي عمل أو امتناع عن فعل من جانبه على المستخدم استنادا إلى المعلومات التي ترد في CNNArabic.COM.");
/*$translations = GoogleTranslate::translateLanguages(
    array (
        "قد تشغل CNNالإعلانات والعروض من أطراف ثالثة على الموقع، عملك أو معاملاتك مع المراسلات، أو المشاركة في أنشطة الترويج والمعلنين الآخرين من CNN أو شروط أو ضمانات أو تمثيلات مرتبطة بمثل هذه التعاملات، هي فقط بينك وبين طرف ثالث من هذا القبيل، CNN ليست مسؤولة عن أي خسارة أو ضرر من أي نوع تكبدتها نتيجة لمثل تلك التعاملات أو كنتيجة لوجود طرف ثالث من المعلنين في الموقع.",
        "(أ) تقر صراحة بأن استعمال CNNArabic.COM على مسؤوليتك وحدك. لا تتحمل CNN، الأم، والشركات التابعة لها، وفروعها الأخرى أو أي من العاملين بكل منهما، مثل الوكلاء، ومزودي المحتوى الخارجي أو المرخصين لهم ضمان أن CNNArabic.COM ستكون غير منقطعة أو خالية من الأخطاء، كما أنها لا تقدم أي ضمانات بالنسبة للنتائج التي يمكن يتم الحصول عليها من استخدام CNNArabic.COM، أو فيما يتعلق بدقة أو مفعولية أو محتوى أي معلومات، والخدمات، أو البضائع المقدمة من خلال CNNArabic.COM.",
        "(ب) تقدم CNNArabic.COM، بما في ذلك على سبيل المثال لا الحصر، أي برنامج للتحميل، على أساس \"كما هي\" دون ضمانات من أي نوع، سواء كانت صريحة أو ضمنية، بما في ذلك على سبيل المثال لا الحصر، ضمانات الملكية أو الضمانات الضمنية لك بالتسويق أو الملاءمة لغرض معين، عدا الضمانات التي يتم تضمينها من الشركة وغير القادرة على تقييد أو استبعاد أو التعديل بموجب القوانين التي تنطبق على شروط الخدمة هذه.",
        "(ج) يمكن لـ CNNArabic.COM تقديم مواضيع مثل الصحة واللياقة البدنية والغذائية وأية معلومات أخرى، ولكن تهدف هذه المعلومات لأغراض تعليمية وإعلامية فقط. حيث أن المعلومات الواردة في CNNArabic.COM لا يقصد بها نقل نصائح طبية. ينبغي عليك عدم الاعتماد على هذه المعلومات كبديل لك، ولا تحل محل، طلب الاستشارة الطبية المتخصصة، التشخيص أو العلاج. الشركة ليست مسؤولة عن أي عمل أو امتناع عن فعل من جانبه على المستخدم استنادا إلى المعلومات التي ترد في CNNArabic.COM.",
    ),
    'ar',
    'en'
);

$translations = GoogleTranslate::translateLanguages(
    array (
        "قد تشغل CNNالإعلانات والعروض من أطراف ثالثة على الموقع، عملك أو معاملاتك مع المراسلات، أو المشاركة في أنشطة الترويج والمعلنين الآخرين من CNN أو شروط أو ضمانات أو تمثيلات مرتبطة بمثل هذه التعاملات، هي فقط بينك وبين طرف ثالث من هذا القبيل، CNN ليست مسؤولة عن أي خسارة أو ضرر من أي نوع تكبدتها نتيجة لمثل تلك التعاملات أو كنتيجة لوجود طرف ثالث من المعلنين في الموقع.",
        "(أ) تقر صراحة بأن استعمال CNNArabic.COM على مسؤوليتك وحدك. لا تتحمل CNN، الأم، والشركات التابعة لها، وفروعها الأخرى أو أي من العاملين بكل منهما، مثل الوكلاء، ومزودي المحتوى الخارجي أو المرخصين لهم ضمان أن CNNArabic.COM ستكون غير منقطعة أو خالية من الأخطاء، كما أنها لا تقدم أي ضمانات بالنسبة للنتائج التي يمكن يتم الحصول عليها من استخدام CNNArabic.COM، أو فيما يتعلق بدقة أو مفعولية أو محتوى أي معلومات، والخدمات، أو البضائع المقدمة من خلال CNNArabic.COM.",
        "(ب) تقدم CNNArabic.COM، بما في ذلك على سبيل المثال لا الحصر، أي برنامج للتحميل، على أساس \"كما هي\" دون ضمانات من أي نوع، سواء كانت صريحة أو ضمنية، بما في ذلك على سبيل المثال لا الحصر، ضمانات الملكية أو الضمانات الضمنية لك بالتسويق أو الملاءمة لغرض معين، عدا الضمانات التي يتم تضمينها من الشركة وغير القادرة على تقييد أو استبعاد أو التعديل بموجب القوانين التي تنطبق على شروط الخدمة هذه.",
        "(ج) يمكن لـ CNNArabic.COM تقديم مواضيع مثل الصحة واللياقة البدنية والغذائية وأية معلومات أخرى، ولكن تهدف هذه المعلومات لأغراض تعليمية وإعلامية فقط. حيث أن المعلومات الواردة في CNNArabic.COM لا يقصد بها نقل نصائح طبية. ينبغي عليك عدم الاعتماد على هذه المعلومات كبديل لك، ولا تحل محل، طلب الاستشارة الطبية المتخصصة، التشخيص أو العلاج. الشركة ليست مسؤولة عن أي عمل أو امتناع عن فعل من جانبه على المستخدم استنادا إلى المعلومات التي ترد في CNNArabic.COM.",
    ),
    'ar',
    'en'
);

$translations = GoogleTranslate::translateLanguages(
    array (
        "قد تشغل CNNالإعلانات والعروض من أطراف ثالثة على الموقع، عملك أو معاملاتك مع المراسلات، أو المشاركة في أنشطة الترويج والمعلنين الآخرين من CNN أو شروط أو ضمانات أو تمثيلات مرتبطة بمثل هذه التعاملات، هي فقط بينك وبين طرف ثالث من هذا القبيل، CNN ليست مسؤولة عن أي خسارة أو ضرر من أي نوع تكبدتها نتيجة لمثل تلك التعاملات أو كنتيجة لوجود طرف ثالث من المعلنين في الموقع.",
        "(أ) تقر صراحة بأن استعمال CNNArabic.COM على مسؤوليتك وحدك. لا تتحمل CNN، الأم، والشركات التابعة لها، وفروعها الأخرى أو أي من العاملين بكل منهما، مثل الوكلاء، ومزودي المحتوى الخارجي أو المرخصين لهم ضمان أن CNNArabic.COM ستكون غير منقطعة أو خالية من الأخطاء، كما أنها لا تقدم أي ضمانات بالنسبة للنتائج التي يمكن يتم الحصول عليها من استخدام CNNArabic.COM، أو فيما يتعلق بدقة أو مفعولية أو محتوى أي معلومات، والخدمات، أو البضائع المقدمة من خلال CNNArabic.COM.",
        "(ب) تقدم CNNArabic.COM، بما في ذلك على سبيل المثال لا الحصر، أي برنامج للتحميل، على أساس \"كما هي\" دون ضمانات من أي نوع، سواء كانت صريحة أو ضمنية، بما في ذلك على سبيل المثال لا الحصر، ضمانات الملكية أو الضمانات الضمنية لك بالتسويق أو الملاءمة لغرض معين، عدا الضمانات التي يتم تضمينها من الشركة وغير القادرة على تقييد أو استبعاد أو التعديل بموجب القوانين التي تنطبق على شروط الخدمة هذه.",
        "(ج) يمكن لـ CNNArabic.COM تقديم مواضيع مثل الصحة واللياقة البدنية والغذائية وأية معلومات أخرى، ولكن تهدف هذه المعلومات لأغراض تعليمية وإعلامية فقط. حيث أن المعلومات الواردة في CNNArabic.COM لا يقصد بها نقل نصائح طبية. ينبغي عليك عدم الاعتماد على هذه المعلومات كبديل لك، ولا تحل محل، طلب الاستشارة الطبية المتخصصة، التشخيص أو العلاج. الشركة ليست مسؤولة عن أي عمل أو امتناع عن فعل من جانبه على المستخدم استنادا إلى المعلومات التي ترد في CNNArabic.COM.",
    ),
    'ar',
    'en'
);*/