import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const GET_PORTFOLIO =
gql`
  query{
    portfolio {
      companyName
      symbol
      description
      url{
          url
      }
      price{
          price
      }
    }
  }
`;

const GET_COMPANY_DATA =
gql`
    query Company($symbol: String!){
        company(symbol: $symbol){
            description
            companyName
            symbol
            url{
                url
            }
            price{
                price
            }
        }
    }
`;

const UPDATE_PORTFOLIO =
gql`
  mutation addStock($input:CompanyInput!){
    addStock(input: $input){
      companyName
      symbol
      description
      url{
          url
      }
      price{
          price
      }
    }
  }
`;

@Component({
  selector: 'stock-picker',
  templateUrl: './stock-picker.component.html',
  styleUrls: ['./stock-picker.component.css']
})
export class StockPickerComponent implements OnInit {

  lookupForm = new FormGroup({
    lookupData: new FormGroup({
        symbol: new FormControl('')
    })
  })

  portfolio: any[] = [];
  loading: boolean;
  stock: any;

  constructor(private apollo: Apollo) { }

    // get the portfolio
   ngOnInit() {
      this.apollo
        .watchQuery({query: GET_PORTFOLIO})
        .valueChanges.subscribe((result: any) => {
            this.portfolio = result.data.portfolio;
            this.loading = result.loading;
        });
    }

    searchStocks(){
      let symbol = this.lookupForm.value.lookupData.symbol;
      this.apollo
      .watchQuery({
          query:GET_COMPANY_DATA,
          variables:{
              symbol :symbol
          }
        })
        .valueChanges.subscribe(({data}: any) => {
            this.stock = data.company;
        }), (error) =>{
            console.log("error", error);
        };
    }

    addToPortfolio(stock){
      //remove reference to old type
      delete stock.__typename
      delete stock.price.__typename
      delete stock.url.__typename
      this.apollo
        .mutate({
          mutation: UPDATE_PORTFOLIO,
          refetchQueries:[
            {
              query: GET_PORTFOLIO
            }
          ],
          variables:{
           input: stock
          }
        })
        .subscribe(({data}:any)=>{
            this.portfolio.push(data.addStock);
            this.stock = ''
        }), (error) =>{
           console.log("error", error);
        };
    }


}



