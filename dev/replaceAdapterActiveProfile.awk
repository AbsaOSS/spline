BEGIN {
  profiles=0
  allowed=0
  if (to_version == "2.12"){
     allowed_versions[0]="spark-2\\.4"
  } else {
     allowed_versions[0]="spark-2\\.2"
  }
}
{
  if ( $0 ~ /<profiles>/ ) {
    profiles=1
    print $0
  } else if ( $0 ~ /<\/profiles>/ ) {
    profiles=0
    print $0
  } else if ((profiles == 1) && ($0 ~ /<id>.*<\/id>/)){
    for (pId in allowed_versions){
       if ($0 ~ allowed_versions[pId]) {
         allowed=1
       }
    }
    print $0
  } else if ((profiles == 1) && (allowed == 0) && ($0 ~ /<activeByDefault>/)) {
    allowed=0
    sub(/<activeByDefault>(true|false)<\/activeByDefault>/, "<activeByDefault>false</activeByDefault>", $0)
    print $0
  } else if ((profiles == 1) && (allowed == 1) && ($0 ~ /<activeByDefault>/)) {
    allowed=0
    sub(/<activeByDefault>(true|false)<\/activeByDefault>/, "<activeByDefault>true</activeByDefault>", $0)
    print $0
  } else print $0
}