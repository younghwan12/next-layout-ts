/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic"

import { Alignment } from "@ckeditor/ckeditor5-alignment"
import { Autosave } from "@ckeditor/ckeditor5-autosave"
import { Bold, Italic, Strikethrough, Underline } from "@ckeditor/ckeditor5-basic-styles"
import { Essentials } from "@ckeditor/ckeditor5-essentials"
import { FontBackgroundColor, FontColor, FontSize } from "@ckeditor/ckeditor5-font"
import { Heading } from "@ckeditor/ckeditor5-heading"
import { Highlight } from "@ckeditor/ckeditor5-highlight"
import { HorizontalLine } from "@ckeditor/ckeditor5-horizontal-line"
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageToolbar,
  ImageUpload,
} from "@ckeditor/ckeditor5-image"
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent"
import { List, ListProperties } from "@ckeditor/ckeditor5-list"
import { MediaEmbed, MediaEmbedToolbar } from "@ckeditor/ckeditor5-media-embed"
import { Paragraph } from "@ckeditor/ckeditor5-paragraph"
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format"
import {
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersMathematical,
  SpecialCharactersText,
} from "@ckeditor/ckeditor5-special-characters"
import {
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
} from "@ckeditor/ckeditor5-table"
import FullScreen from "./FullScreen"
// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
  public static override builtinPlugins = [
    Alignment,
    AutoImage,
    Autosave,
    Bold,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontSize,
    Heading,
    Highlight,
    HorizontalLine,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    List,
    ListProperties,
    MediaEmbed,
    MediaEmbedToolbar,
    Paragraph,
    RemoveFormat,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    Underline,
    FullScreen,
  ]

  public static override defaultConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "removeFormat",
        "highlight",
        "specialCharacters",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "fontSize",
        "|",
        "bulletedList",
        "numberedList",
        "alignment",
        "|",
        "insertTable",
        "|",
        "imageInsert",
        "mediaEmbed",
        "|",
        "indent",
        "outdent",
        "FullScreen",
      ],
    },
    language: "ko",
    image: {
      toolbar: ["imageTextAlternative", "toggleImageCaption"],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableCellProperties", "tableProperties"],
    },
  }
}

export default Editor
