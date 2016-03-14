package com.intl.util.math;

import java.text.DecimalFormat;
import java.util.List;

public class MathUtil {
	public static String addCommasToNumber(Float number) {
		DecimalFormat formatter = new DecimalFormat("#,##0.00");
		return formatter.format(number);
	}

	public static int getLastElement(List<Object> element) {
		int size = element.size();
		return size - 1;

	}
}
