BEGIN {
  profiles=0
  inFromVersion=0
  inToVersion=0
  gsub(/\./, "\\.", from_version) # escape the dot
  gsub(/\./, "\\.", to_version) # escape the dot
  from_id_string="<id>scala-"from_version"<\\/id>"
  to_id_string="<id>scala-"to_version"<\\/id>"
}
{
  if ( $0 ~ /<profiles>/ ) {
    profiles=1
    print $0
  } else if ( $0 ~ /<\/profiles>/ ) {
    profiles=0
    print $0
  } else if ((profiles == 1) && ($0 ~ from_id_string)) {
    inFromVersion=1
    inToVersion=0
    print $0
  } else if ((profiles == 1) && ($0 ~ to_id_string)){
    inFromVersion=0
    inToVersion=1
    print $0
  } else if ((profiles == 1) && (inFromVersion == 1) && ($0 ~ /<activeByDefault>/)) {
    inFromVersion=0
    sub(/<activeByDefault>(true|false)<\/activeByDefault>/, "<activeByDefault>false</activeByDefault>", $0)
    print $0
  } else if ((profiles == 1) && (inToVersion == 1) && ($0 ~ /<activeByDefault>/)) {
    inToVersion=0
    sub(/<activeByDefault>(true|false)<\/activeByDefault>/, "<activeByDefault>true</activeByDefault>", $0)
    print $0
  } else print $0
}