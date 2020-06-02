// function initPriceSlider(opt) {
//   let options = {
//     sliderEl: opt.sliderEl, lowInputEl: opt.lowInputEl, highInputEl: opt.highInputEl,
//     connect: true,
//     range: {
//       min: parseInt(opt.lowInputEl.getAttribute('min')),
//       max: parseInt(opt.highInputEl.getAttribute('max'))
//     }
//   };
//
//   let slider = noUiSlider.create(options.sliderEl, {
//     start: [options.range.min, options.range.max],
//     connect: true,
//     range: {
//       min: options.range.min,
//       max: options.range.max
//     }
//   });
//
//   options.sliderEl.noUiSlider.on('update', function (values, handle) {
//     let updateInputElement = !handle ? options.lowInputEl : options.highInputEl;
//     updateInputElement.value = Math.round(values[handle]).toLocaleString('ru-RU');
//   });
//
//   $(options.sliderEl).on('clear', function () {
//     slider.set([-1, 999999999999999])
//   });
//
//   $(options.lowInputEl).on('change', function () {
//     slider.set([this.value, null])
//   });
//
//   $(options.highInputEl).on('change', function () {
//     slider.set([null, this.value])
//   });
// }
//
// class BaseSelect {
//   static mutipleValue(prevVal, nextValue) {
//     let result = [];
//     let indexOf = prevVal.indexOf(nextValue);
//     //console.log(indexOf);
//     if (indexOf >= 0) {
//       prevVal.splice(indexOf, 1)
//       //result = prevVal.filter(val => nextValue !== val)
//     } else {
//       prevVal.push(nextValue)
//     }
//     //console.log(prevVal, result)
//     return prevVal;
//   }
//
//   static getItemTemplate(text, value, selectedClass, disabledClass, groupId) {
//     return `<span class="select-dropdown--item js-custom-select-item ${selectedClass} ${disabledClass}" data-value="${value}" data-text="${text}" data-group-id="${groupId}"><span class="inner-text">${text}</span></span>`;
//   }
//
//   static getItemHighlightSearchedTemplate(text) {
//     return `<span class="select-dropdown--highlight">${text}</span>`;
//   }
//
//   static getItemHighlightNormalTemplate(text) {
//     return `<span>${text}</span>`;
//   }
//
//   constructor(element, wrapperElement) {
//     const bodyEl = document.querySelector('body');
//     const wrapperEl = wrapperElement || bodyEl;
//
//     //this.clickEventName = detectIt.primaryInput === 'mouse' ? 'click' : 'click';
//     this.clickEventName = 'click';
//     this.domLinks = {
//       el: element,
//       $el: $(element),
//       selectOverlayEl: element.querySelector('.js-select-overlay'),
//       $selectOverlayEl: $(element.querySelector('.js-select-overlay')),
//       $selectDropdown: $(element).find('.js-select-dropdown'),
//       wrapperEl,
//       $wrapperEl: $(wrapperEl),
//       bodyEl,
//       $keyboard: $(element).find('.js-select-keyboard'),
//       $selectEl: $(element).find('select'),
//       $button: $(element).find('.select-multiple-button'),
//       $selectGroup: $(element).find('.js-select-group'),
//       selectResultEl: element.querySelector('.js-select-button-result'),
//       $searchInputEl: $(element).find('.js-search-button-input'),
//       itemsAll: element.querySelector('.js-dropdown-all'),
//       itemsSearched: element.querySelector('.js-dropdown-search')
//     };
//
//     this.isMultiple = !!this.domLinks.$selectEl.attr('multiple');
//     this.isGroups = this.domLinks.$selectEl.attr('groups') === 'true';
//     this.isKeyboard = this.domLinks.$keyboard.attr('data-is-keyboard') === 'true';
//
//     //console.log(this.domLinks.$keyboard, this.domLinks.$keyboard.attr('data-is-keyboard'), this.isKeyboard, this.domLinks.$selectEl.attr('groups'))
//
//     this.renderItemsList();
//     this.changePlaceholder();
//     this.toggleButton();
//     this.initEvents();
//     this.initKeyboard()
//
//   }
//
//   initEvents() {
//     this.domLinks.selectOverlayEl.addEventListener(this.clickEventName, e => this.onSelectOverlayClick(e));
//     this.domLinks.$searchInputEl.on('input', e => this.onSearchInputChange(e));
//     this.domLinks.bodyEl.addEventListener(this.clickEventName, e => this.onBodyClick(e));
//     document.addEventListener('keydown', e => this.onDocumentKeydown(e));
//     this.domLinks.$el.find('.js-custom-select-item').on(this.clickEventName, e => this.onItemClick(e));
//     this.domLinks.$selectEl.on('change', e => this.onSelectChange(e));
//     this.domLinks.$button.on(this.clickEventName, e => this.onButtonClick(e));
//     this.domLinks.$selectGroup.on(this.clickEventName, e => this.onGroupClick(e));
//     /* window.addEventListener('resize', () => {
//          this.closeDropDown()
//      });*/
//
//     this.domLinks.$el.find('.js-clear-search').on('click', () => {
//       this.domLinks.$searchInputEl.val('').trigger('input');
//       this.domLinks.$el.find('.js-clear-search').removeClass('is-visible');
//     });
//
//     this.domLinks.$el.find('.js-close-button-mobile').on(this.clickEventName, e => {
//       e.stopPropagation();
//       this.closeDropDown(e);
//     });
//   }
//
//   initKeyboard() {
//     if (!this.isKeyboard) return null;
//
//     //let keyboardSting = 'abcdefghijklmnopqrstuvwxyz';
//     //let keyboardArray = keyboardSting.split('');
//
//     let keyboardArray = [...this.domLinks.$selectEl.find('option')]
//       .map(el => !!$(el).text()[0] ? $(el).text()[0] : null)
//       .filter((v, i, s) => s.indexOf(v) === i && !!v);
//
// //        console.log(keyboardArray)
//
//     keyboardArray.forEach(letter => {
//       let template = `<span class="select-keyboard-letter js-select-keyboard-letter" data-letter="${letter}">${letter}</span>`;
//       this.domLinks.$keyboard.append(template);
//     });
//
//     this.domLinks.$keyboard.find('.js-select-keyboard-letter').on('click', (e) => {
//       this.domLinks.$searchInputEl.val($(e.target).attr('data-letter')).trigger('input');
//     });
//   }
//
//   onSelectChange(e) {
//     // console.log(e, this.domLinks.$selectEl.val())
//     this.changePlaceholder();
//     this.changeItemsList();
//     this.toggleButton();
//
//     (!this.domLinks.$selectEl.val() || !this.domLinks.$selectEl.val().length) && this.onGroupClick(true);
//
//     //!!this.domLinks.$selectEl.val() && this.onGroupClick(null);
//   }
//
//   onSelectOverlayClick() {
//     this.openDropDown()
//   }
//
//   onBodyClick(e) {
//     !e.propagationPath().includes(this.domLinks.selectOverlayEl) && this.closeDropDown()
//   }
//
//   onDocumentKeydown(e) {
//     e.keyCode === 27 && this.closeDropDown();
//   }
//
//   onSearchInputChange(e) {
//     this.searchItems(e.target.value)
//   }
//
//   onButtonClick(e) {
//     e.stopPropagation();
//     this.changePlaceholder();
//     this.changeItemsList();
//     this.closeDropDown();
//   }
//
//   onItemClick(e) {
//     e.stopPropagation();
//     const $target = $(e.currentTarget);
//     const nextValue = $target.attr('data-value');
//     !this.isMultiple && this.closeDropDown();
//     this.setSelectValue(nextValue);
//   }
//
//   onGroupClick(e) {
//
//     if (typeof e === 'boolean' && e) {
//       this.domLinks.$selectGroup.removeClass('is-active');
//       return
//     }
//
//     let groupId = $(e.target).attr('data-group-id');
//     let active = $(e.target).hasClass('is-active');
//     let grElems = this.domLinks.$el.find(`.js-custom-select-item[data-group-id="${groupId}"]`);
//     let values = [];
//
//     //this.domLinks.$selectGroup.removeClass('is-active');
//     $(e.target).toggleClass('is-active', !active);
//
//     grElems.each(function (i, el) {
//       let val = !$(el).hasClass('is-disabled') && $(el).attr('data-value');
//       values.push(val);
//     });
//     let prev = this.domLinks.$selectEl.val();
//     this.domLinks.$selectEl.val(!active ? values.concat(prev) : prev.filter(prevVal => !values.includes(prevVal))).trigger('change');
//   }
//
//   openDropDown() {
//     this.domLinks.selectOverlayEl.classList.add('is-open');
//     this.domLinks.$searchInputEl.focus();
//     this.setDropdownPosition()
//   }
//
//   setDropdownPosition() {
//     const ddW = this.domLinks.$selectDropdown.outerWidth();
//     const ddO = this.domLinks.$selectOverlayEl.offset().left;
//     const wrW = this.domLinks.$wrapperEl.outerWidth();
//     const wrO = this.domLinks.$wrapperEl.offset().left;
//     const padding = 80;
//     const leftMax = -1 * ((ddO + ddW) - (wrO + wrW - padding));
//
//     this.domLinks.$selectDropdown.css({
//       left: ddO + ddW > wrO + wrW - padding ? leftMax : 0
//     })
//   }
//
//   setSelectValue(nextValue) {
//     //console.log(nextValue);
//     const prevVal = this.domLinks.$selectEl.val();
//     const value = this.isMultiple ? BaseSelect.mutipleValue(prevVal, nextValue) : nextValue;
//     this.domLinks.$selectEl.val(value).trigger('change');
//   }
//
//   toggleButton() {
//     const value = this.domLinks.$selectEl.val();
//     const noSelection = (!value || !value.length);
//     this.domLinks.$button.toggleClass('is-disabled', noSelection);
//   }
//
//   changePlaceholder() {
//     const value = this.domLinks.$selectEl.val();
//     const text = this.domLinks.$selectEl.find('option:selected').text();
//     const noSelection = (!value || !value.length);
//     const selectedPlaceholder = Array.isArray(value) ? (value.length === 1 ? text : `Выбрано (${value.length})`) : text;
//     const placeholder = noSelection ? 'Выбрать' : selectedPlaceholder;
//     $(this.domLinks.selectResultEl).text(placeholder).toggleClass('is-selected', !noSelection);
//   }
//
//   closeDropDown() {
//     this.domLinks.selectOverlayEl.classList.remove('is-open');
//     this.domLinks.$searchInputEl.val('');
//     this.searchItems('');
//   }
//
//   searchItems(searchString) {
//     this.searchedItems = 0;
//     this.searchString = searchString;
//     this.items.forEach(($el) => {
//       const text = this.isKeyboard ? $el.attr('data-text').toLowerCase()[0] : $el.attr('data-text').toLowerCase();
//       if (text.indexOf(this.searchString.toLowerCase()) >= 0 && !!this.searchString) {
//         this.searchedItems++;
//         $el.isSearched = true;
//       } else {
//         $el.isSearched = false;
//       }
//     });
//
//     this.updateItemsList(this.searchString)
//
//     this.domLinks.$el.find('.js-clear-search').toggleClass('is-visible', this.searchString !== '');
//   }
//
//   updateItemsList() {
//     this.domLinks.itemsSearched.innerHTML = '';
//     //this.domLinks.itemsAll.innerHTML = '';
//
//     if (this.searchedItems === 0 || !this.searchString) {
//       this.domLinks.selectOverlayEl.classList.remove('is-searching');
//     } else {
//       this.domLinks.selectOverlayEl.classList.add('is-searching');
//     }
//
//     this.items.forEach(($el) => {
//       if ($el.isSearched) {
//         $(this.domLinks.itemsSearched).append($el);
//       } else if (this.isGroups) {
//         let groupId = $el.attr('data-group-id');
//         $(this.domLinks.itemsAll).find(`.js-select-group-cont[data-group-id="${groupId}"]`).append($el);
//       } else {
//         $(this.domLinks.itemsAll).append($el);
//       }
//     });
//
//     this.highlightText();
//   }
//
//   highlightText() {
//     $(this.domLinks.itemsSearched).find('.js-custom-select-item').each((i, el) => {
//       const $el = $(el);
//       const text = $el.attr('data-text');
//       const separator = '@s@';
//       const regexpFlag = this.isKeyboard ? 'i' : 'gi';
//       const separatedText = text.replace(new RegExp(this.searchString, regexpFlag), separator + this.searchString + separator);
//       const separatedTextArray = separatedText.split(separator);
//       const filtered = separatedTextArray.filter(value => !!value);
//
//       $el.find('span.inner-text').html('');
//
//       let from = 0;
//       let to = 0;
//       let substring = '';
//
//       filtered.forEach((textPart, i) => {
//         from = to;
//         to = from + textPart.length;
//         substring = text.substring(from, to);
//
//         //console.log($el)
//         if (textPart === this.searchString) {
//           $el.find('span.inner-text').append(BaseSelect.getItemHighlightSearchedTemplate(substring))
//         } else {
//           $el.find('span.inner-text').append(BaseSelect.getItemHighlightNormalTemplate(substring))
//         }
//       })
//     });
//
//     $(this.domLinks.itemsAll).find('.js-custom-select-item').each((i, el) => {
//       const $el = $(el);
//       $el.find('span.inner-text').text($el.attr('data-text'));
//     });
//   }
//
//   renderItemsList() {
//     this.items = [];
//     this.domLinks.$selectEl.find('option').each((i, option) => {
//       const $option = $(option);
//       const text = $option.text();
//       const value = $option.val();
//       const isHidden = $option.prop('hidden');
//       const selectedClass = !!$option.prop('selected') ? 'is-active' : '';
//       const disabledClass = !!$option.prop('disabled') ? 'is-disabled' : '';
//
//       if (!isHidden)
//         if (!this.isGroups) {
//           this.items.push($(BaseSelect.getItemTemplate(text, value, selectedClass, disabledClass)).appendTo(this.domLinks.itemsAll));
//         } else {
//           let groupId = $option.attr('group');
//           let cont = this.domLinks.$el.find(`.js-select-group-cont[data-group-id="${groupId}"]`);
//           this.items.push($(BaseSelect.getItemTemplate(text, value, selectedClass, disabledClass, groupId)).appendTo(cont));
//         }
//     });
//   }
//
//   changeItemsList() {
//     this.domLinks.$selectEl.find('option').each((i, option) => {
//       i > 0 && this.items[i - 1].toggleClass('is-active', $(option).prop('selected'));
//     });
//   }
// }
//
// function initSelects() {
//   const filterConteinerElement = document.querySelector('.js-filter-container');
//   const body = document.querySelector('body');
//
//   [...document.querySelectorAll('.js-init-custom-select')].forEach((el) => {
//     new BaseSelect(el, filterConteinerElement);
//   });
// }
//
// function initFormActions() {
//
//   // toggle additional size
//   $('.js-toggle-size-filter').on('click', function () {
//     $('.js-front-axis-caption').toggleClass('is-hidden');
//     $('.js-back-axis-caption').toggleClass('is-hidden');
//     $('.js-additional-size').toggleClass('is-hidden');
//     $('.js-toggle-size-filter').toggleClass('is-open');
//   });
//
//   // toggle additional params
//   $('.js-toggle-params-filter').on('click', function () {
//     $(this).toggleClass('is-open');
//     $('.js-additional-params').toggleClass('is-hidden');
//   });
//
//   // switch footer links tabs
//   $('.js-footer-tablinks').on('click', function () {
//     const tabId = $(this).attr('data-tab-id');
//     $('.js-footer-tablinks').removeClass('active');
//     $(this).addClass('active');
//     $('.js-tabcontent').hide();
//     $(`.js-tabcontent#${tabId}`).show();
//   });
//   $(`.js-footer-tablinks[data-tab-id="R13"]`).click();
//
//   // switch by tire/by auto
//   $('.js-header-cta').on('click', function () {
//     $(this).toggleClass('is-params');
//     $('.js-filter-by-params').toggleClass('is-hidden');
//     $('.js-filter-by-auto').toggleClass('is-hidden');
//     $('.js-header-params').toggleClass('is-hidden');
//     $('.js-header-auto').toggleClass('is-hidden');
//
//   });
//
//   // toggle reset button
//   $('.js-reset-filter').parent().hide();
//   $('.js-reset-filter').on('click', function () {
//
//     $('.js-filter-container')
//       .find('input')
//       .val('').trigger('change')
//       .prop("checked", false);
//
//     $('.price-slider').trigger('clear');
//
//
//     $('.js-filter-container').find('select').each(function () {
//       this.selectedIndex = -1;
//       $(this).trigger('change')
//     });
//
//     $('.js-get-result').removeClass('is-active');
//     $('.js-reset-filter').parent().hide();
//   });
//
//   $('.js-filter-container').find('select').on('change', function () {
//     $('.js-reset-filter').parent().show();
//     $('.js-get-result').addClass('is-active');
//   });
//
//   $('.js-filter-container').find('input').on('change', function () {
//     $('.js-reset-filter').parent().show();
//     $('.js-get-result').addClass('is-active');
//   });
//
//   $('.price-slider').each(function (i, el) {
//     el.noUiSlider && el.noUiSlider.on('change', function () {
//       $('.js-reset-filter').parent().show();
//       $('.js-get-result').addClass('is-active');
//     });
//   });
// }
//
//
// document.addEventListener("DOMContentLoaded", () => {
//   initSelects();
//
//   //params
//   initPriceSlider({
//     sliderEl: $('.js-price-slider-params')[0],
//     lowInputEl: $('.js-input-price-slider-low-params')[0],
//     highInputEl: $('.js-input-price-slider-high-params')[0]
//   });
//
//
//   //auto
//   initPriceSlider({
//     sliderEl: $('.js-price-slider-auto')[0],
//     lowInputEl: $('.js-input-price-slider-low-auto')[0],
//     highInputEl: $('.js-input-price-slider-high-auto')[0]
//   });
//
//   initFormActions();
// });
