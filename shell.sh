#defined color
color_start="\033[1;32m"
color_red="\033[1;31m"
color_end="\033[0m"

printLineStars() {
  for i in {1..100}
  do
    echo -n -e "$color_start*"
  done
  echo -e
}

while [[ $app_env_num < 1 ]] || [[ $app_env_num > 4 ]]
do
  printLineStars

  echo -e "$color_start_guide
    *--Choosing: GAME , ENVIRONMENT, ROLE, PLATFORM && BUILD NUMBER to excute:
    *--LOTTO_6_49:1 LOTTO_5_45: 2
    *--TEST_RPC:1 DEV_COMMERCIAL: 2
    *--MANAGER:1 DIRECTOR:2 OPERATOR: 3 RANDAO_OPERATOR1: 4 RANDAO_OPERATOR2: 5 BOUNTY_KEEPER: 6
    *--ALL:1 MAC ONLY:2
    "
  printLineStars

  read -p "Your game: " your_game
  read -p "Your environment: " app_env_num
  read -p "Your role: " your_role
  read -p "Your platform: " your_plat_form
  read -p "Your build number: " BUILD_NUMBER

  if [[ $app_env_num < 1 ]] || [[ $app_env_num > 2 ]];
  then
    echo -e "$color_start_red Your choose is bad"
  fi
done

CONFIG_GAME=('lotto-6-49' 'lotto-5-45')
CONFIG_EVNS=('TEST_RPC' 'DEV_COMMERCIAL')
CONFIG_CONTRACTS=('test_rpc' 'dev_commercial')
TOOLS_MANAGER=('manager' 'director' 'operator' 'operator1' 'operator2' 'bounty-keeper')

# create .env file

RAW_ENV_CONFIG_FILE=.env.example
ENV_CONFIG_FILE=.env

APP_GAME="'${CONFIG_GAME[$your_game - 1]}'"
APP_ENV=${CONFIG_EVNS[$app_env_num -1]}
APP_CONFIG_CONTRACT=${CONFIG_CONTRACTS[$app_env_num -1]}
APP_WALLET_ROLE=${TOOLS_MANAGER[$your_role -1]}
APP_VERSION="APP_VERSION='1.0.0'"

sed -ni '' $ENV_CONFIG_FILE
sed -n "/$APP_CONFIG_CONTRACT/p" $RAW_ENV_CONFIG_FILE > $ENV_CONFIG_FILE
sed -i "$ a $APP_VERSION" $ENV_CONFIG_FILE
sed -i "$ a APP_GAME=$APP_GAME" $ENV_CONFIG_FILE
sed -i "$ a APP_BUILD_NUMBER=$BUILD_NUMBER" $ENV_CONFIG_FILE
sed -i "$ a APP_ENV=$APP_ENV" $ENV_CONFIG_FILE
sed -i "$ a APP_WALLET_ROLE=$APP_WALLET_ROLE" $ENV_CONFIG_FILE

cat .env

# echo -e "$color_start_guide Building tool $APP_WALLET_ROLE ...."
# if [[ $your_plat_form == 1 ]]; then
#     yarn package-release
#   else
#     yarn package-mac
#   fi
