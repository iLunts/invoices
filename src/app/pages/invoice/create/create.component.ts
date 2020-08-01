import { Component, OnInit } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { Platform } from '@ionic/angular';

// PDF make
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class InvoiceCreateComponent implements OnInit {
  letterObj = {
    to: 'Email to',
    from: 'Email from',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem repellat dignissimos nostrum obcaecati hic, perspiciatis voluptates animi consequuntur iste! Earum maxime deleniti perspiciatis unde dolor cumque necessitatibus quaerat doloremque',
  };
  pdfObj = null;

  constructor(
    private pdfGenerator: PDFGenerator,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {}

  generate() {
    // let options = {
    //   documentSize: 'A4',
    //   // type: 'base64',
    //   type: 'share',
    //   fileName: 'invoice.pdf',
    // };
    // const data = `
    // <div>
    //   <h1>My title</h1>
    //   <p>
    //     This is a sentence with a <strong>bold word</strong>, <em>one in italic</em>,
    //     and <u>one with underline</u>. And finally.
    //   </p>
    //   <table>
    //     <tr>
    //       <th>Header 1</th>
    //     </tr>
    //     <tr>
    //       <td>Cell A1</td>
    //     </tr>
    //   </table>
    //   <span>Text in green using the styles from PDFMake</span>
    //   <p>Test content</p>
    // </div>`;
    // this.pdfGenerator
    //   .fromURL(data, options)
    //   .then((base64String) => console.log(base64String));
  }

  createPdf() {
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right', style: 'headerDate' },

        { text: 'From', style: 'subheader' },
        { text: this.letterObj.from },

        { text: 'To', style: 'subheader' },
        this.letterObj.to,

        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },

        {
          ul: ['Bacon', 'Rips', 'BBQ'],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          width: '50%',
        },
        headerDate: {
          fontSize: 18,
          bold: true,
          width: '50%',
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0],
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        },
      },
    };
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file
          .writeFile(this.file.dataDirectory, 'myletter.pdf', blob, {
            replace: true,
          })
          .then((fileEntry) => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(
              this.file.dataDirectory + 'invoice.pdf',
              'application/pdf'
            );
          });
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
}
