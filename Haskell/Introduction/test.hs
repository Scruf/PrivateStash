-- Comments and stuf
{-
    Stuff
-}
import Data.List
import System.IO


--Int -2^63 2^63

-- sumOfNum  = sum  [1..1000]


-- modEx =  mod 5 4
-- modEx2 = 5 `mod` 4
-- negNum = 5 + (-4)

-- num9  = 9 :: Int
-- sqrt9  = sqrt (fromIntegral num9)

-- primeNumbers = [3,5,7,11]
-- morePrimes = primeNumbers ++ [13,17,19]



-- favNums = 2 : 7 : 21 : 66 :[]

-- multList = [[3,5,7],[11,13,17]]
-- morePrimes2 = 2 : morePrimes


-- lenPrime  = length morePrimes2


-- revPrime = reverse morePrimes2
-- isListEmpty = null morePrimes2

-- secondPrime = morePrimes2 !! 2

-- firstPrime = head morePrimes2
-- lastPrint = last morePrimes2
-- primeInit = init morePrimes2
-- first3 = take 3 morePrimes2

-- is7Inlist = 7 `elem` morePrimes2
-- maxPrime = maximum morePrimes2
-- minPrint = minimum morePrimes2


-- evenList = [2,4..20]
-- latterLIst = ['A','B'..'Z']

-- inifPow10 = [10,20..]

-- many2s = take 10 (repeat 2)
-- listTimes2 = [x*2 | x <-[1,2..10],x*3 <= 50]
-- sumOFList  = zipWith (+) [1,2,3,50]


-- listddd = filter (>5) morePrimes2
-- evensss = takeWhile (<=20) [2,4..]


-- multOFList = foldl (*) 1 [2,3,4,5]
-- multOFLisss =  foldr (+) 2 [4,5,6,7]

-- pow3 =  [2^n | n <-[1,2..10]]



-- randTuple = (1, "randTuple")
-- bobSmithc= ("BOb Smig",52)
-- names = ["Mary", "Smith","Johan"]
-- addresses = ["1233 Main","234 North","367 South"]

-- nameAndAddresses = zip names addresses


-- main = do
--  putStrLn "Whats your poison"
--  name <- getLine
--  putStrLn ("Hello "++name)


addMe :: Int -> Int -> Int
addMe xs ys =  xs + ys

sumMe xs ys = xs + ys


sumTuple :: (Int, Int) -> (Int,Int)-> (Int, Int)
sumTuple (xs,ys)(xs2,ys2) = (xs+xs2,ys+ys2)


whatAge :: Int ->String
whatAge 16 = "TUplke"
whatAge 19 = "Boooo"
whatAge _ = "Nothing Importante"

factorial :: Int -> Int

factorial 0 = 1
factorial x = x * factorial (x-1)

productFact n = product [1..n]

isOdd :: Int -> Bool

isOdd n
    | n `mod` 2 == 0 = False
    | otherwise = True

isEven n = n `mod` 2 == 0  

whatGrade :: Int -> String

whatGrade age
    | (age>=5) && (age<=6) = "Supernam"
    | otherwise = "Something Somethin"


batingAvgRatint :: Double -> Double -> String

batingAvgRatint hits adBats
    | avg <= 0.200 = "terrinb"
    | avg <= 0.250 = "something"
    | avg <=0.2344 = "Sooo"
    where  avg = hits/adBats


getListItems :: [Int] -> String



getListItems [] = "Empty"
getListItems (x::[]) = "Your list starts with "++show x
getListItems(x:y:[]) = "Your list hast "++show x " and "++show y
getListItems(x:xs)="The First item is "++show x " and "++show xs