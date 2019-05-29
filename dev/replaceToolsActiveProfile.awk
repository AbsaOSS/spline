BEGIN {
  profiles=0
  tools=0
  id_string="<id>tools<\\/id>"
  active="true"
  if (to_version == "2.12") {
    active="false"
  }
}
{
  if ( $0 ~ /<profiles>/ ) {
    profiles=1
    print $0
  } else if ( $0 ~ /<\/profiles>/ ) {
    profiles=0
    print $0
  } else if ((profiles == 1) && ($0 ~ id_string)) {
    tools=1
    print $0
  } else if ((profiles == 1) && (tools == 1) && ($0 ~ /<activeByDefault>/)) {
    tools=0
    sub(/<activeByDefault>(true|false)<\/activeByDefault>/, "<activeByDefault>"active"</activeByDefault>", $0)
    print $0
  } else print $0
}