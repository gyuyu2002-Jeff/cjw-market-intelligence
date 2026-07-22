@echo off
cd /d C:\Users\gyuyu\Documents\CJW\industry-hub
echo ========================================== >> daily_update.log
echo Starting Daily Update [%date% %time%] >> daily_update.log
C:\Users\gyuyu\AppData\Local\Programs\Python\Python314\python.exe automate_update.py >> daily_update.log 2>&1
echo Finished Daily Update [%date% %time%] >> daily_update.log
echo ========================================== >> daily_update.log
