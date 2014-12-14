<?php
namespace aperturescience\i18n;

//use aperturescience\exception\ApertureScienceTranslateException;
//use aperturescience\i18n\GoogleTranslate;
require "GoogleTranslate.php";

/**
 * This class implements caching for the translate API as well
 * as data storage before being transferred to DataMart in NoSQL
 * Also handles translation corrections by users
 *
 * @extends GoogleTranslate
 * 
 * @author Cyril Ogana <cogana@gmail.com>
 * 
 */
class ApertureScienceTranslate extends GoogleTranslate
{
    private static $_dbConnection = null;
    
    /**
     * Instantiate the static database $_dbConnection
     * 
     * @param array $dbParams - Associative array of MySQL connect settings
     *                          (user, host, password, database, unix_socket)
     * 
     * @return void
     */
    public static function setDbParams($dbParams) {
        //validate param is an array
        if (!(is_array($dbParams)))  {
            throw new ApertureScienceTranslateException('DB initialization expects an array as the parameter', 8101);
        }
        
        //validate required parameters
        if (
            !(isset($dbParams['user'])) 
            ||
            !(isset($dbParams['host']))
            ||
            !(isset($dbParams['database']))
            ||
            !(isset($dbParams['password']))
        ) {
            throw new ApertureScienceTranslateException('One of DB user, host, database or password is not set', 8102);
        }
        
        //cast to string
        $dbUser = (string) $dbParams['user'];
        $dbHost = (string) $dbParams['host'];
        $dbDbse = (string) $dbParams['database'];
        $dbPass = (string) $dbParams['password'];
        
        //unix socket is optional
        if (!(isset($dbParams['unix_socket']))) {
            $dbSock = null;
        } else {
            $dbSock = (string) $dbParams['unix_socket'];            
        }
        
        //Open MySQLi $_dbConnection
        if ($dbSock == null) {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbDbse);
        } else {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbDbse, $dbSock);
        }
        
        //check for Mysql connect error
        if ($mysqli->connect_errno) {
            throw new ApertureScienceTranslateException('Error connecting to MySQL database using connection settings', 8103);
        }
        
        self::$_dbConnection = $mysqli;
    }
    
    /**
     * Assert that the database is connected, prior to making queries
     * 
     * @return void
     */
    protected static function _checkDbConnection() {
        if (is_null(self::$_dbConnection)) {
            throw new ApertureScienceTranslateException('Database connection has not been instantiated', 8104);
        }
    }
    
    public static function translateLanguages(
        $originalString,
        $sourceLang,
        $targetLang,
        $fields = 'translations'
    ) {
        //Create hash of original string
        $originalStringHash = sha1($originalString);
        
        //check DB $_dbConnection
        self::_checkDbConnection();
        
        //Search if exists in foreign language phrase hash table
        if ($stmtSearch = 
            $mysqli->prepare(
                "SELECT id, machine_translation
                    FROM aperturetranslate_foreignphrasehash
                    WHERE
                        phrase_hash = ?"
            )
        ) {
            //bind parameters
            $stmtSearch->bind_param('s', $originalStringHash);
            
            //execute query
            $stmtSearch->execute();
            
            //bind result variables
            $stmtSearch->bind_result($hashId, $machineTranslation);
            
            //fetch value
            $stmtSearch->fetch();
            
            //if hash id is is is_null
            if (is_null($hashId)) {
                return GoogleTranslate::fetchtranslateLanguages(
                    $originalString,
                    $sourceLang,
                    $targetLang = 'en',
                    $fields = 'translations'
                );
            } else {
                return $machineTranslation;
            }
        }
    }
}

echo '
<h4>
ApertureScienceTranslate::translateLanguages(
    "(ج) يمكن لـ CNNArabic.COM تقديم مواضيع مثل الصحة واللياقة البدنية والغذائية وأية معلومات أخرى، ولكن تهدف هذه المعلومات لأغراض تعليمية وإعلامية فقط. حيث أن المعلومات الواردة في CNNArabic.COM لا يقصد بها نقل نصائح طبية. ينبغي عليك عدم الاعتماد على هذه المعلومات كبديل لك، ولا تحل محل، طلب الاستشارة الطبية المتخصصة، التشخيص أو العلاج. الشركة ليست مسؤولة عن أي عمل أو امتناع عن فعل من جانبه على المستخدم استنادا إلى المعلومات التي ترد في CNNArabic.COM.",
    ,"ar",
    ,"en"
);</h4>';

$translations = ApertureScienceTranslate::translateLanguages(
        "(ج) يمكن لـ CNNArabic.COM تقديم مواضيع مثل الصحة واللياقة البدنية والغذائية وأية معلومات أخرى، ولكن تهدف هذه المعلومات لأغراض تعليمية وإعلامية فقط. حيث أن المعلومات الواردة في CNNArabic.COM لا يقصد بها نقل نصائح طبية. ينبغي عليك عدم الاعتماد على هذه المعلومات كبديل لك، ولا تحل محل، طلب الاستشارة الطبية المتخصصة، التشخيص أو العلاج. الشركة ليست مسؤولة عن أي عمل أو امتناع عن فعل من جانبه على المستخدم استنادا إلى المعلومات التي ترد في CNNArabic.COM.",
    
    'ar',
    'en'
);

echo $translations;
