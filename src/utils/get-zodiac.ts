import { HoroscopeEnum } from "./horoscope.enum";
import { ZodiacEnum } from "./zodiac.enum";

export function getZodiac(birthday: Date): ZodiacEnum {

    const data = [
        {
            end: new Date("2024-02-09"),
            start: new Date("2023-01-22"),
            zodiac: ZodiacEnum.RABBIT,
        },
        {
            end: new Date("2023-01-21"),
            start: new Date("2022-02-01"),
            zodiac: ZodiacEnum.TIGER,
        },
        {
            end: new Date("2022-01-31"),
            start: new Date("2021-02-12"),
            zodiac: ZodiacEnum.OX,
        },
        {
            end: new Date("2021-02-11"),
            start: new Date("2020-01-25"),
            zodiac: ZodiacEnum.RAT,
        },
        {
            end: new Date("2020-01-24"),
            start: new Date("2019-02-05"),
            zodiac: ZodiacEnum.PIG,
        },
        {
            end: new Date("2019-02-04"),
            start: new Date("2018-02-16"),
            zodiac: ZodiacEnum.DOG,
        },
        {
            end: new Date("2018-02-15"),
            start: new Date("2017-01-28"),
            zodiac: ZodiacEnum.ROOSTER,
        },
        {
            end: new Date("2017-01-27"),
            start: new Date("2016-02-08"),
            zodiac: ZodiacEnum.MONKEY,
        },
        {
            end: new Date("2016-02-07"),
            start: new Date("2015-02-19"),
            zodiac: ZodiacEnum.GOAT,
        },
        {
            end: new Date("2015-02-18"),
            start: new Date("2014-01-31"),
            zodiac: ZodiacEnum.HORSE,
        },
        {
            end: new Date("2014-01-30"),
            start: new Date("2013-02-10"),
            zodiac: ZodiacEnum.SNAKE,
        },
        {
            end: new Date("2013-02-09"),
            start: new Date("2012-01-23"),
            zodiac: ZodiacEnum.DRAGON,
        },
        {
            end: new Date("2012-01-22"),
            start: new Date("2011-02-03"),
            zodiac: ZodiacEnum.RABBIT,
        },
        {
            end: new Date("2011-02-02"),
            start: new Date("2010-02-14"),
            zodiac: ZodiacEnum.TIGER,
        },
        {
            end: new Date("2010-02-13"),
            start: new Date("2009-01-26"),
            zodiac: ZodiacEnum.OX,
        },
        {
            end: new Date("2009-01-25"),
            start: new Date("2008-02-07"),
            zodiac: ZodiacEnum.RAT,
        },
        {
            end: new Date("2008-02-06"),
            start: new Date("2007-02-18"),
            zodiac: ZodiacEnum.BOAR,
        },
        {
            end: new Date("2007-02-17"),
            start: new Date("2006-01-29"),
            zodiac: ZodiacEnum.DOG,
        },
        {
            end: new Date("2006-01-28"),
            start: new Date("2005-02-09"),
            zodiac: ZodiacEnum.ROOSTER,
        },
        {
            end: new Date("2005-02-08"),
            start: new Date("2004-01-22"),
            zodiac: ZodiacEnum.MONKEY,
        },
        {
            end: new Date("2004-01-21"),
            start: new Date("2003-02-01"),
            zodiac: ZodiacEnum.GOAT,
        },
        {
            end: new Date("2003-01-31"),
            start: new Date("2002-02-12"),
            zodiac: ZodiacEnum.HORSE,
        },
        {
            end: new Date("2002-02-11"),
            start: new Date("2001-01-24"),
            zodiac: ZodiacEnum.SNAKE,
        },
        {
            end: new Date("2001-01-23"),
            start: new Date("2000-02-05"),
            zodiac: ZodiacEnum.DRAGON,
        },
        {
            end: new Date("2000-02-04"),
            start: new Date("1999-02-16"),
            zodiac: ZodiacEnum.RABBIT,
        },
        {
            end: new Date("1999-02-15"),
            start: new Date("1998-01-28"),
            zodiac: ZodiacEnum.TIGER,
        },
        {
            end: new Date("1998-01-27"),
            start: new Date("1997-02-07"),
            zodiac: ZodiacEnum.OX,
        },
        {
            end: new Date("1997-02-06"),
            start: new Date("1996-02-19"),
            zodiac: ZodiacEnum.RAT,
        },
        {
            end: new Date("1996-02-18"),
            start: new Date("1995-01-31"),
            zodiac: ZodiacEnum.BOAR,
        },
        {
            end: new Date("1995-01-30"),
            start: new Date("1994-02-10"),
            zodiac: ZodiacEnum.DOG,
        },
        {
            end: new Date("1994-02-09"),
            start: new Date("1993-01-23"),
            zodiac: ZodiacEnum.ROOSTER,
        },
        {
            end: new Date("1993-01-22"),
            start: new Date("1992-02-04"),
            zodiac: ZodiacEnum.MONKEY,
        },
        {
            end: new Date("1992-02-03"),
            start: new Date("1991-02-15"),
            zodiac: ZodiacEnum.GOAT,
        },
        {
            end: new Date("1991-02-14"),
            start: new Date("1990-01-27"),
            zodiac: ZodiacEnum.HORSE,
        },
        {
            end: new Date("1990-01-26"),
            start: new Date("1989-02-06"),
            zodiac: ZodiacEnum.SNAKE,
        },
        {
            end: new Date("1989-02-05"),
            start: new Date("1988-02-17"),
            zodiac: ZodiacEnum.DRAGON,
        },
        {
            end: new Date("1988-02-16"),
            start: new Date("1987-01-29"),
            zodiac: ZodiacEnum.RABBIT,
        },
        {
            end: new Date("1987-01-28"),
            start: new Date("1986-02-09"),
            zodiac: ZodiacEnum.TIGER,
        },
        {
            end: new Date("1986-02-08"),
            start: new Date("1985-02-20"),
            zodiac: ZodiacEnum.OX,
        },
        {
            end: new Date("1985-02-19"),
            start: new Date("1984-02-02"),
            zodiac: ZodiacEnum.RAT,
        },
        {
            end: new Date("1984-02-01"),
            start: new Date("1983-02-13"),
            zodiac: ZodiacEnum.BOAR,
        },
        {
            end: new Date("1983-02-12"),
            start: new Date("1982-01-25"),
            zodiac: ZodiacEnum.DOG,
        },
        {
            end: new Date("1982-01-24"),
            start: new Date("1981-02-05"),
            zodiac: ZodiacEnum.ROOSTER,
        },
        {
            end: new Date("1981-02-04"),
            start: new Date("1980-02-16"),
            zodiac: ZodiacEnum.MONKEY,
        },
        {
            end: new Date("1980-02-15"),
            start: new Date("1979-01-28"),
            zodiac: ZodiacEnum.GOAT,
        },
        {
            end: new Date("1979-01-27"),
            start: new Date("1978-02-07"),
            zodiac: ZodiacEnum.HORSE,
        },
        {
            end: new Date("1978-02-06"),
            start: new Date("1977-02-18"),
            zodiac: ZodiacEnum.SNAKE,
        },
        {
            end: new Date("1977-02-17"),
            start: new Date("1976-01-31"),
            zodiac: ZodiacEnum.DRAGON,
        },
        {
            end: new Date("1976-01-30"),
            start: new Date("1975-02-11"),
            zodiac: ZodiacEnum.RABBIT,
        },
        {
            end: new Date("1975-02-10"),
            start: new Date("1974-01-23"),
            zodiac: ZodiacEnum.TIGER,
        },
        {
            end: new Date("1974-01-22"),
            start: new Date("1973-02-03"),
            zodiac: ZodiacEnum.OX,
        },
        {
            end: new Date("1973-02-02"),
            start: new Date("1972-01-16"),
            zodiac: ZodiacEnum.RAT,
        },
        {
            end: new Date("1972-01-15"),
            start: new Date("1971-01-27"),
            zodiac: ZodiacEnum.BOAR,
        },
        {
            end: new Date("1971-01-26"),
            start: new Date("1970-02-06"),
            zodiac: ZodiacEnum.DOG,
        },
        {
            end: new Date("1970-02-05"),
            start: new Date("1969-02-17"),
            zodiac: ZodiacEnum.ROOSTER,
        },
        {
            end: new Date("1969-02-16"),
            start: new Date("1968-01-30"),
            zodiac: ZodiacEnum.MONKEY,
        },
        {
            end: new Date("1968-01-29"),
            start: new Date("1967-02-09"),
            zodiac: ZodiacEnum.GOAT,
        },
        {
            end: new Date("1967-02-08"),
            start: new Date("1966-01-21"),
            zodiac: ZodiacEnum.HORSE,
        },
        {
            end: new Date("1966-01-20"),
            start: new Date("1965-02-02"),
            zodiac: ZodiacEnum.SNAKE,
        },
        {
            end: new Date("1965-02-01"),
            start: new Date("1964-02-13"),
            zodiac: ZodiacEnum.DRAGON,
        },
        {
            end: new Date("1964-02-12"),
            start: new Date("1963-01-25"),
            zodiac: ZodiacEnum.RABBIT,
        },
        {
            end: new Date("1963-01-24"),
            start: new Date("1962-02-05"),
            zodiac: ZodiacEnum.TIGER,
        },
        {
            end: new Date("1962-02-04"),
            start: new Date("1961-02-15"),
            zodiac: ZodiacEnum.OX,
        },
        {
            end: new Date("1961-02-14"),
            start: new Date("1960-01-28"),
            zodiac: ZodiacEnum.RAT,
        },
        {
            end: new Date("1960-01-27"),
            start: new Date("1959-02-08"),
            zodiac: ZodiacEnum.BOAR,
        },
        {
            end: new Date("1959-02-07"),
            start: new Date("1958-02-18"),
            zodiac: ZodiacEnum.DOG,
        },
        {
            end: new Date("1958-02-17"),
            start: new Date("1957-01-31"),
            zodiac: ZodiacEnum.ROOSTER,
        },
        {
            end: new Date("1957-01-30"),
            start: new Date("1956-02-12"),
            zodiac: ZodiacEnum.MONKEY,
        },
        {
            end: new Date("1956-02-11"),
            start: new Date("1955-01-24"),
            zodiac: ZodiacEnum.GOAT,
        },
        {
            end: new Date("1955-01-23"),
            start: new Date("1954-02-03"),
            zodiac: ZodiacEnum.HORSE,
        },
        {
            end: new Date("1954-02-02"),
            start: new Date("1953-02-14"),
            zodiac: ZodiacEnum.SNAKE,
        },
        {
            end: new Date("1953-02-13"),
            start: new Date("1952-01-27"),
            zodiac: ZodiacEnum.DRAGON,
        },
        {
            end: new Date("1952-01-26"),
            start: new Date("1951-02-06"),
            zodiac: ZodiacEnum.RABBIT,
        },
        {
            end: new Date("1951-02-05"),
            start: new Date("1950-02-17"),
            zodiac: ZodiacEnum.TIGER,
        },
        {
            end: new Date("1950-02-16"),
            start: new Date("1949-01-29"),
            zodiac: ZodiacEnum.OX,
        },
        {
            end: new Date("1949-01-28"),
            start: new Date("1948-02-10"),
            zodiac: ZodiacEnum.RAT,
        },
        {
            end: new Date("1948-02-09"),
            start: new Date("1947-01-22"),
            zodiac: ZodiacEnum.BOAR,
        },
        {
            end: new Date("1947-01-21"),
            start: new Date("1946-02-02"),
            zodiac: ZodiacEnum.DOG,
        },
        {
            end: new Date("1946-02-01"),
            start: new Date("1945-02-13"),
            zodiac: ZodiacEnum.ROOSTER,
        },
        {
            end: new Date("1945-02-12"),
            start: new Date("1944-01-25"),
            zodiac: ZodiacEnum.MONKEY,
        },
        {
            end: new Date("1944-01-24"),
            start: new Date("1943-02-05"),
            zodiac: ZodiacEnum.GOAT,
        },
        {
            end: new Date("1943-02-04"),
            start: new Date("1942-02-15"),
            zodiac: ZodiacEnum.HORSE,
        },
        {
            end: new Date("1942-02-14"),
            start: new Date("1941-01-27"),
            zodiac: ZodiacEnum.SNAKE,
        },
        {
            end: new Date("1941-01-26"),
            start: new Date("1940-02-08"),
            zodiac: ZodiacEnum.DRAGON,
        },
        {
            end: new Date("1940-02-07"),
            start: new Date("1939-02-19"),
            zodiac: ZodiacEnum.RABBIT,
        },
        {
            end: new Date("1939-02-18"),
            start: new Date("1938-01-31"),
            zodiac: ZodiacEnum.TIGER,
        },
        {
            end: new Date("1938-01-30"),
            start: new Date("1937-02-11"),
            zodiac: ZodiacEnum.OX,
        },
        {
            end: new Date("1937-02-10"),
            start: new Date("1936-01-24"),
            zodiac: ZodiacEnum.RAT,
        },
        {
            end: new Date("1936-01-23"),
            start: new Date("1935-02-04"),
            zodiac: ZodiacEnum.BOAR,
        },
        {
            end: new Date("1935-02-03"),
            start: new Date("1934-02-14"),
            zodiac: ZodiacEnum.DOG,
        },
        {
            end: new Date("1934-02-13"),
            start: new Date("1933-01-26"),
            zodiac: ZodiacEnum.ROOSTER,
        },
        {
            end: new Date("1933-01-25"),
            start: new Date("1932-02-06"),
            zodiac: ZodiacEnum.MONKEY,
        },
        {
            end: new Date("1932-02-05"),
            start: new Date("1931-02-17"),
            zodiac: ZodiacEnum.GOAT,
        },
        {
            end: new Date("1931-02-16"),
            start: new Date("1930-01-30"),
            zodiac: ZodiacEnum.HORSE,
        },
        {
            end: new Date("1930-01-29"),
            start: new Date("1929-02-10"),
            zodiac: ZodiacEnum.SNAKE,
        },
        {
            end: new Date("1929-02-09"),
            start: new Date("1928-01-23"),
            zodiac: ZodiacEnum.DRAGON,
        },
        {
            end: new Date("1928-01-22"),
            start: new Date("1927-02-02"),
            zodiac: ZodiacEnum.RABBIT,
        },
        {
            end: new Date("1927-02-01"),
            start: new Date("1926-02-13"),
            zodiac: ZodiacEnum.TIGER,
        },
        {
            end: new Date("1926-02-12"),
            start: new Date("1925-01-25"),
            zodiac: ZodiacEnum.OX,
        },
        {
            end: new Date("1925-01-24"),
            start: new Date("1924-02-05"),
            zodiac: ZodiacEnum.RAT,
        },
        {
            end: new Date("1924-02-04"),
            start: new Date("1923-02-16"),
            zodiac: ZodiacEnum.BOAR,
        },
        {
            end: new Date("1923-02-15"),
            start: new Date("1922-01-28"),
            zodiac: ZodiacEnum.DOG,
        },
        {
            end: new Date("1922-01-27"),
            start: new Date("1921-02-08"),
            zodiac: ZodiacEnum.ROOSTER,
        },
        {
            end: new Date("1921-02-07"),
            start: new Date("1920-02-20"),
            zodiac: ZodiacEnum.MONKEY,
        },
        {
            end: new Date("1920-02-19"),
            start: new Date("1919-02-01"),
            zodiac: ZodiacEnum.GOAT,
        },
        {
            end: new Date("1919-01-31"),
            start: new Date("1918-02-11"),
            zodiac: ZodiacEnum.HORSE,
        },
        {
            end: new Date("1918-02-10"),
            start: new Date("1917-01-23"),
            zodiac: ZodiacEnum.SNAKE,
        },
        {
            end: new Date("1917-01-22"),
            start: new Date("1916-02-03"),
            zodiac: ZodiacEnum.DRAGON,
        },
        {
            end: new Date("1916-02-02"),
            start: new Date("1915-02-14"),
            zodiac: ZodiacEnum.RABBIT,
        },
        {
            end: new Date("1915-02-13"),
            start: new Date("1914-01-26"),
            zodiac: ZodiacEnum.TIGER,
        },
        {
            end: new Date("1914-01-25"),
            start: new Date("1913-02-06"),
            zodiac: ZodiacEnum.OX,
        },
        {
            end: new Date("1913-02-05"),
            start: new Date("1912-02-18"),
            zodiac: ZodiacEnum.RAT,
        },
    ];



    return data.find((e) => {
        return birthday >= e.start && birthday <= e.end;
    }).zodiac || null;


}

export function getHoroscope(birthday: Date): HoroscopeEnum {
    var data = [
        {
            start: new Date("2024-3-21"),
            end: new Date("2024-4-19"),
            horoscope: HoroscopeEnum.ARIES,
        },
        {
            start: new Date("2024-4-20"),
            end: new Date("2024-5-20"),
            horoscope: HoroscopeEnum.TAURUS,
        },
        {
            start: new Date("2024-5-21"),
            end: new Date("2024-6-21"),
            horoscope: HoroscopeEnum.GEMINI,
        },
        {
            start: new Date("2024-6-22"),
            end: new Date("2024-7-22"),
            horoscope: HoroscopeEnum.CANCER,
        },
        {
            start: new Date("2024-7-23"),
            end: new Date("2024-8-22"),
            horoscope: HoroscopeEnum.LEO,
        },
        {
            start: new Date("2024-8-23"),
            end: new Date("2024-9-22"),
            horoscope: HoroscopeEnum.VIRGO,
        },
        {
            start: new Date("2024-9-23"),
            end: new Date("2024-1- 23"),
            horoscope: HoroscopeEnum.LIBRA,
        },
        {
            start: new Date("2024-1-24"),
            end: new Date("2024-1-21"),
            horoscope: HoroscopeEnum.SCORPIO,
        },
        {
            start: new Date("2024-1-22"),
            end: new Date("2024-1-21"),
            horoscope: HoroscopeEnum.SAGITTARIUS,
        },
        {
            start: new Date("2024-1-22"),
            end: new Date("2024-1-31"),
            horoscope: HoroscopeEnum.CAPRICORN,
        },
        {
            start: new Date("2024-1-1"),
            end: new Date("2024-1-19"),
            horoscope: HoroscopeEnum.CAPRICORN,
        },
        {
            start: new Date("2024-1-20"),
            end: new Date("2024-2-18"),
            horoscope: HoroscopeEnum.AQUARIUS,
        },
        {
            start: new Date("2024-2-19"),
            end: new Date("2024-3-20"),
            horoscope: HoroscopeEnum.PISCES,
        },
    ];


    birthday.setFullYear(2024);

    return data.find((e) => {
        const start = e.start;
        start.setFullYear(2024);
        const end = e.end;
        end.setFullYear(2024);

        return birthday >= start && birthday <= end;
    }).horoscope || null;

}
