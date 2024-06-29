package com.personal.workandtravel.service;

import org.springframework.stereotype.Service;


import javax.money.CurrencyUnit;
import javax.money.Monetary;
import javax.money.MonetaryAmount;
import javax.money.convert.CurrencyConversion;
import javax.money.convert.MonetaryConversions;
import java.util.Collection;


@Service
public class CurrencyConversionService {

    CurrencyConversion conversionUSD = MonetaryConversions.getConversion("USD");

    public double convertToUSD(double amount, String currencyCode) {
        MonetaryAmount baseCurrency = Monetary.getDefaultAmountFactory().setCurrency(currencyCode)
                .setNumber(amount).create();
        MonetaryAmount convertedAmount = baseCurrency.with(conversionUSD);
        return convertedAmount.getNumber().doubleValue();
    }
}
