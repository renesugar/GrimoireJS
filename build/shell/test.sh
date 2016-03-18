case $CIRCLE_NODE_INDEX in
  0)
    npm run build -- --branch=$CIRCLE_BRANCH
    npm run lint -- --branch=$CIRCLE_BRANCH;;
  1)
    npm run doc -- --branch=$CIRCLE_BRANCH;;
  2)
    npm run cover -- --report-dir=ci/cover/$CIRCLE_BRANCH
    rc=$?;
    if [ $rc != 0 ]; then
      npm rebuild
      npm run cover -- --report-dir=ci/cover/$CIRCLE_BRANCH
      exit $?
    else
      exit $rc
    fi;;
esac