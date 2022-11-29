functions = src/tagSatisfying.js src/applyTypography.js  src/cleanTags.js src/convertImage.js src/createPopup.js src/isALink.js src/isAnImage.js src/isBadTag.js src/isEmptyButShouldNot.js src/isUsefulAttribute.js src/isUsefulTag.js src/shouldBeReplaced.js src/main.js

clean-html.html: clean-html.template.bash clean-html.bookmarklet
	bash clean-html.template.bash > clean-html.html

clean-html.js: $(functions)
	uglifyjs $(functions) > clean-html.js

clean-html.bookmarklet: to-url.py clean-html.js
	python3 ./to-url.py < clean-html.js > clean-html.bookmarklet

clean:
	rm -f clean-html.js clean-html.bookmarklet clean-html.html
