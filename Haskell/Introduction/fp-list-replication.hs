f :: Int -> [Int] -> [Int]
f n arr = --finish it later
main :: IO ()
main = getContents>>=
	mapM_print. (\(n:arr)->f n arr). map read. words
